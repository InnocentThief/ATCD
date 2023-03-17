import { Button, Card, Divider, H5, Icon, NonIdealState, NonIdealStateIconSize, Spinner, Tag } from '@blueprintjs/core'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { observer } from 'mobx-react'

class Songs extends React.Component{
    async componentDidMount() {
        const {
            songs: { fetchSongs }
        } = Context

        await fetchSongs()
    }

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

        return(
            <Container>
                <NonIdeal>
                    {loadingSongs ? (
                        <NonIdealState>
                            <Spinner />
                            Loading songs...
                        </NonIdealState>
                    ): loadedSongs.length == 0 && (
                        <NonIdealState
                            icon="search"  
                            iconSize={NonIdealStateIconSize.SMALL}
                            title="No search results"
                            description={nonIdealStateDescription}
                        />
                    )}
                </NonIdeal>
                {loadedSongs.length > 0 && (
                    <Ideal>
                        <SearchArea>
                            
                            <Button intent='primary' icon="search" text="Search" />
                        </SearchArea>
                        <SongList>
                            {loadedSongs.map(s=> (
                                <SongCard key={s.songKey} elevation={2}>
                                    <SongCardContent>
                                        <SongCardCover>
                                            <img src={s.coverUrl} height={100} width={100} />
                                        </SongCardCover>
                                        <SongCardSongInfo>
                                            <H5>
                                                <a href={`songs/${s.songKey}`} >{s.title} - {s.artist}</a>
                                            </H5>
                                            <p>Mapped by <a href={`mappers/${s.authorKey}`} >{s.author}</a></p>
                                            <SongCardGenreChoreographyInfo>
                                                <GenreTag round={true}>{s.genre}</GenreTag>
                                                <Divider />
                                                {s.choreographies.map(c => (
                                                    <ChoreographyTag key={c.choreographyKey}>
                                                        {c.choreographyType} ({c.displayName})
                                                    </ChoreographyTag>
                                                ))}
                                            </SongCardGenreChoreographyInfo>
                                        </SongCardSongInfo>
                                        <SongCardAdditionalInfo>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.songKey}</SongCardAdditionalInfoValue>
                                                <Icon icon="key" />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.length}</SongCardAdditionalInfoValue>
                                                <Icon icon="time" />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.avgBpm}</SongCardAdditionalInfoValue>
                                                <Icon icon="dashboard" />
                                            </SongCardAdditionalInfoRow>
                                        </SongCardAdditionalInfo>
                                    </SongCardContent>
                                </SongCard>
                            ))}
                        </SongList>
                    </Ideal>
                )}
            </Container>
        )
    }
}

const Container = styled(Vertical)`
    max-height: 100%;
`

const NonIdeal = styled.div`
    grid-area: nonideal;
    max-height: 100%;
    display: flex;
    align-items: flex-start;
    gap: 50px;
`

const Ideal = styled.div`
    width: 100%;
    align-content: center;
`

const SearchArea = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
`

const SongList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`

const SongCard = styled(Card)`
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px;
    width: 640px;
`

const SongCardContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const SongCardCover = styled.div`
    margin-right: 10px;
`

const SongCardSongInfo = styled.div`
    width: 100%;
`

const SongCardGenreChoreographyInfo = styled.div`
    display: flex;
    flex-direction: row;
`
const GenreTag = styled(Tag)`
    margin-right: 3px;
`

const ChoreographyTag = styled(Tag)`
    margin-left: 3px;
    margin-right: 3px;
`

const SongCardAdditionalInfo = styled.div`
    widht: 100%;
    width: 150px;
`

const SongCardAdditionalInfoRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
`

const SongCardAdditionalInfoValue = styled.div`
    margin-right: 10px;
`

export default observer(Songs)