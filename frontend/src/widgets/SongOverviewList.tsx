import { observer } from 'mobx-react'
import React from 'react'
import { Context } from '../contexts'
import Vertical from '../components/layouts/Vertical'
import styled from 'styled-components'
import { NonIdealState, NonIdealStateIconSize, Spinner } from '@blueprintjs/core'
import SongOverviewCard from './SongOverviewCard'

class SongOverviewList extends React.Component {
    render() {
        const {
            songs: {
                loadedSongs,
                loadingSongs
            }
        } = Context

        const nonIdealStateDescription = (
            <div>
                Your search didn't match any songs.
                <br />
                Try searching for something else.
            </div>
        );

        // const indexOfLastPost = this.state.songList_currentPage * this.state.songList_postsPerPage
        // const indexOfFirstPost = indexOfLastPost - this.state.songList_postsPerPage
        // const currentSongs = loadedSongs.slice(indexOfFirstPost, indexOfLastPost)
        // const paginate

        return (
            <Container>
                {loadingSongs ? (
                    <NonIdealState>
                        <Spinner />
                        Loading songs...
                    </NonIdealState>
                ): loadedSongs.length === 0 && (
                    <NonIdealState 
                        icon="search"
                        iconSize={NonIdealStateIconSize.SMALL}
                        title="No songs found"
                        description={nonIdealStateDescription}
                    />
                )}
                {loadedSongs.length > 0 && loadingSongs === false && (
                    <SongList>
                        {loadedSongs.map(s=> (
                            <SongOverviewCard 
                                key={s.songKey} 
                                item={s}
                            />
                        ))}
                    </SongList>
                )}
            </Container>
        )
    }
}   

const Container = styled(Vertical)`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
`

const SongList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 6px;
    width: 100%;
`

export default observer(SongOverviewList)