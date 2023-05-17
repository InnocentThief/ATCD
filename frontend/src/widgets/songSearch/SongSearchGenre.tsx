import { ControlGroup, Intent, TagProps } from '@blueprintjs/core'
import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import { GenreDto } from '../../models/GenreDto'
import { MenuItem2 } from '@blueprintjs/popover2'
import { areGenresEqual, arrayContainsGenre, filterGenre, getItemProps } from '../../helpers/songGenre'

class SongSearchGenre extends React.Component {
  render() {
    const {
      genres: { loadedGenres },
      songSearch: { selectedGenres },
      language: { get },
    } = Context

    const getTagProps = (_value: React.ReactNode): TagProps => ({
      intent: Intent.NONE,
      minimal: false,
    })

    return (
      <AdvancedSearchControlGroup vertical={true} fill={true}>
        <AdvancedSearchLabel>
          {get('SongSearch.Genre.Label')}
        </AdvancedSearchLabel>
        <MultiSelect2
          initialContent={undefined}
          itemPredicate={filterGenre}
          itemRenderer={this.renderGenre}
          items={loadedGenres}
          itemsEqual={areGenresEqual}
          menuProps={{ 'aria-label': 'Choregraphy Types' }}
          noResults={
            <MenuItem2
              disabled={true}
              text="No results."
              roleStructure="listoption"
            />
          }
          onClear={this.handleGenresClear}
          onItemSelect={this.handleGenreSelect}
          placeholder={get('SongSearch.Genre.Placeholder')}
          popoverProps={{ matchTargetWidth: true, popoverClassName: "genrePopOver", }}
          resetOnSelect={true}
          selectedItems={selectedGenres}
          tagRenderer={this.renderTag}
          tagInputProps={{
            onRemove: this.handleTagRemove,
            tagProps: getTagProps,
          }}
        />
      </AdvancedSearchControlGroup>
    )
  }

  private renderTag = (genre: GenreDto) =>
    genre.displayName

  private renderGenre: ItemRenderer<GenreDto> = (genre, props) => {
    if (!props.modifiers.matchesPredicate) {
      return null
    }

    return (
      <MenuItem2
        {...getItemProps(genre, props)}
        selected={this.isGenreSelected(genre)}
        shouldDismissPopover={false}
        text={genre.displayName}
      />
    )
  }

  private handleTagRemove = (_tag: React.ReactNode, index: number) => {
    this.deselectGenre(index)
  }

  private getSelectedGenreIndex(genre: GenreDto) {
    const {
      songSearch: { selectedGenres },
    } = Context
    return selectedGenres.indexOf(genre)
  }

  private isGenreSelected(genre: GenreDto) {
    return this.getSelectedGenreIndex(genre) !== -1
  }

  private selectGenre(genre: GenreDto) {
    this.selectGenres([genre])
  }

  private selectGenres(choreoTypesToSelect: GenreDto[]) {
    const {
      songSearch: { selectedGenres, updateSelectedGenres },
    } = Context

    let nextGenres = selectedGenres.slice()

    choreoTypesToSelect.forEach(genre => {
      nextGenres = !arrayContainsGenre(nextGenres, genre) ? [...nextGenres, genre] : nextGenres
    })
    updateSelectedGenres(nextGenres)
  }

  private deselectGenre(index: number) {
    const {
      songSearch: { selectedGenres, updateSelectedGenres },
    } = Context

    let currentGenres = selectedGenres.slice()
    let nextGenres = currentGenres.filter((_genre, i) => i !== index)
    updateSelectedGenres(nextGenres)
  }

  private handleGenreSelect = (genre: GenreDto) => {
    if (!this.isGenreSelected(genre)) {
      this.selectGenre(genre)
    } else {
      this.deselectGenre(this.getSelectedGenreIndex(genre))
    }
  }

  private handleGenresClear = () => {
    const {
      songSearch: { clearSelectedGenres }
    } = Context
    clearSelectedGenres()
  }

}

const AdvancedSearchLabel = styled.div`
  margin-bottom: 6px;
`

const AdvancedSearchControlGroup = styled(ControlGroup)`
  margin-bottom: 10px;
`

export default observer(SongSearchGenre)
