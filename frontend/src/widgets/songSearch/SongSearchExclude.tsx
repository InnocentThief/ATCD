import { ControlGroup, Intent, TagProps } from '@blueprintjs/core'
import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import { CHOREOGRAPHY_EXCLUDES, ChoreographyExclude, areChoreoExcludesEqual, arrayContainsChoreoExclude, filterChoreoExclude, getItemProps } from '../../helpers/choreographyExcludes'
import { MenuItem2 } from '@blueprintjs/popover2'

class SongSearchExclude extends React.Component {
  render() {
    const {
      songSearch: { selectedChoreoExcludes },
      language: { get },
    } = Context

    const getTagProps = (_value: React.ReactNode): TagProps => ({
      intent: Intent.NONE,
      minimal: false,
    })

    return (
      <AdvancedSearchControlGroup vertical={true} fill={true}>
        <AdvancedSearchLabel>
          {get('SongSearch.Exclude.Label')}
        </AdvancedSearchLabel>
        <MultiSelect2
          initialContent={undefined}
          itemPredicate={filterChoreoExclude}
          itemRenderer={this.renderChoreoExclude}
          items={CHOREOGRAPHY_EXCLUDES}
          itemsEqual={areChoreoExcludesEqual}
          menuProps={{ 'aria-label': 'Choregraphy Excludes' }}
          noResults={
            <MenuItem2
              disabled={true}
              text="No results."
              roleStructure="listoption"
            />
          }
          onClear={this.handleChoreoExcludesClear}
          onItemSelect={this.handleChoreoExcludeSelect}
          placeholder={get('SongSearch.Exclude.Placeholder')}
          resetOnSelect={true}
          selectedItems={selectedChoreoExcludes}
          tagRenderer={this.renderTag}
          tagInputProps={{
            onRemove: this.handleTagRemove,
            tagProps: getTagProps,
          }}
        />
      </AdvancedSearchControlGroup>
    )
  }

  private renderTag = (choreographyExclude: ChoreographyExclude) =>
    choreographyExclude.displayName

  private renderChoreoExclude: ItemRenderer<ChoreographyExclude> = (choreoExclude, props) => {
    if (!props.modifiers.matchesPredicate) {
      return null
    }

    return (
      <MenuItem2
        {...getItemProps(choreoExclude, props)}
        selected={this.isChoreoExcludeSelected(choreoExclude)}
        shouldDismissPopover={false}
        text={choreoExclude.displayName}
      />
    )
  }

  private handleTagRemove = (_tag: React.ReactNode, index: number) => {
    this.deselectChoreoExclude(index)
  }

  private getSelectedChoreoExcludeIndex(choreoExclude: ChoreographyExclude) {
    const {
      songSearch: { selectedChoreoExcludes },
    } = Context
    return selectedChoreoExcludes.indexOf(choreoExclude)
  }

  private isChoreoExcludeSelected(choreoExclude: ChoreographyExclude) {
    return this.getSelectedChoreoExcludeIndex(choreoExclude) !== -1
  }

  private selectChoreoExclude(choreoExclude: ChoreographyExclude) {
    this.selectChoreoExcludes([choreoExclude])
  }

  private selectChoreoExcludes(choreoExcludesToSelect: ChoreographyExclude[]) {
    const {
      songSearch: { selectedChoreoExcludes, updateSelectedChoreoExcludes },
    } = Context

    let nextChoreoExcludes = selectedChoreoExcludes.slice()

    choreoExcludesToSelect.forEach(choreoExclude => {
      nextChoreoExcludes = !arrayContainsChoreoExclude(nextChoreoExcludes, choreoExclude) ? [...nextChoreoExcludes, choreoExclude] : nextChoreoExcludes
    })
    updateSelectedChoreoExcludes(nextChoreoExcludes)
  }

  private deselectChoreoExclude(index: number) {
    const {
      songSearch: { selectedChoreoExcludes, updateSelectedChoreoExcludes },
    } = Context

    let currentChoreoExcludes = selectedChoreoExcludes.slice()
    let nextChoreoExcludes = currentChoreoExcludes.filter((_choreoExclude, i) => i !== index)
    updateSelectedChoreoExcludes(nextChoreoExcludes)
  }

  private handleChoreoExcludeSelect = (choreoExclude: ChoreographyExclude) => {
    if (!this.isChoreoExcludeSelected(choreoExclude)) {
      this.selectChoreoExclude(choreoExclude)
    } else {
      this.deselectChoreoExclude(this.getSelectedChoreoExcludeIndex(choreoExclude))
    }
  }

  private handleChoreoExcludesClear = () => {
    const {
      songSearch: { clearSelectedChoreoExcludes }
    } = Context
    clearSelectedChoreoExcludes()
  }
}

const AdvancedSearchLabel = styled.div`
  margin-bottom: 6px;
`

const AdvancedSearchControlGroup = styled(ControlGroup)`
  margin-bottom: 10px;
`

export default observer(SongSearchExclude)
