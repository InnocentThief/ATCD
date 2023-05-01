import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { observer } from 'mobx-react'
import SongSearch from '../../widgets/SongSearch'
import SongOverviewList from '../../widgets/SongOverviewList'

interface IState {
    songList_currentPage: number
    songList_postsPerPage: number
}

class Songs extends React.Component<IState>{
    state: IState = {
        songList_currentPage: 0,
        songList_postsPerPage: 50
    }

    async componentDidMount() {
        const {
            songs: { fetchSongs, loadedSongs }
        } = Context

        if (loadedSongs.length == 0) {
            await fetchSongs({
                searchText: ""
            })
        }
    }

    render() {
        return(
            <Container>
                <SongSearch />
                <SongOverviewList />
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