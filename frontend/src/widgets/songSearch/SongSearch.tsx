import React from 'react'
import {
  Button,
  Collapse,
  ControlGroup,
  InputGroup,
  Intent,
} from '@blueprintjs/core'
import { Context } from '../../contexts'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import SongSearchPublished from './SongSearchPublished'
import SongSearchExclude from './SongSearchExclude'
import SongSearchGenre from './SongSearchGenre'
import SongSearchChoreoType from './SongSearchChoreoType'
import SongSearchGemSpeed from './SongSearchGemSpeed'

class SongSearch extends React.Component {
  componentWillUnmount(): void {
    const {
      songSearch: { searchPromise },
    } = Context
    if (searchPromise) {
      searchPromise.cancel()
    }
  }

  render() {
    const {
      songSearch: { searchText, advancedSearchVisible },
      language: { get },
    } = Context

    return (
      <Container>
        <ControlGroup>
          <InputGroup
            type="search"
            leftIcon="search"
            placeholder={get('SongSearch.SearchBox.Placeholder')}
            fill={true}
            value={searchText}
            onChange={this.updateSearchText}
            onKeyPress={this.handleEnter}
          />
          <Button
            onClick={this.handleAdvancedSearchVisibleClick}
            icon="settings"
          >
            {advancedSearchVisible
              ? get('SongSearch.AdvancedSearch.Hide')
              : get('SongSearch.AdvancedSearch.Show')}
          </Button>
        </ControlGroup>
        <Collapse isOpen={advancedSearchVisible}>
          <SearchDetails>
            <SongSearchExclude />
            <SongSearchGenre />
            <SongSearchChoreoType />
            <SongSearchPublished />
          </SearchDetails>
          <SearchButton
            text="Search"
            intent={Intent.PRIMARY}
            onClick={this.search}
          />
        </Collapse>
        {/* <SongSearchOrderBy /> */}
      </Container>
    )
  }

  private handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      songSearch: { search, resetPage },
    } = Context
    if (event.key === 'Enter') {
      resetPage()
      search()
    }
  }

  private handleAdvancedSearchVisibleClick = () => {
    const {
      songSearch: { changeAdvancedSearchVisibleState },
    } = Context
    changeAdvancedSearchVisibleState()
  }

  private updateSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      songSearch: { updateSearchText },
    } = Context
    updateSearchText(event.target.value)
  }

  private search = async () => {
    const {
      songSearch: { search },
    } = Context
    search()
  }
}

const Container = styled.div`
  padding-bottom: 15px;
`

const SearchDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 0px 10px;
  width: 100%;
  margin-top: 20px;
`

const SearchButton = styled(Button)`
  width: 100%;
`

export default observer(SongSearch)
