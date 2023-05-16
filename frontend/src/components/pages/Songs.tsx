import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { observer } from 'mobx-react'
import SongSearch from '../../widgets/songSearch/SongSearch'
import SongOverviewList from '../../widgets/SongOverviewList'
import SongsPaginate from '../../widgets/SongsPaginate'

class Songs extends React.Component {
  async componentDidMount() {
    const {
      songs: { loadedSongs },
      songSearch: { search },
    } = Context

    if (loadedSongs.length === 0) {
      await search()
    }
  }

  render() {
    return (
      <Container>
        <SongSearch />
        <SongOverviewList />
        <SongsPaginate />
      </Container>
    )
  }
}

const Container = styled(Vertical)`
  max-width: 1300px;
  margin: 15px auto;
  width: 100%;
`

export default observer(Songs)
