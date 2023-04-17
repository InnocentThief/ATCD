import { Button, Card, ControlGroup, Divider, H5, Icon, InputGroup, Label, NonIdealState, NonIdealStateIconSize, Spinner, Switch, Tag } from '@blueprintjs/core'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'
import { observer } from 'mobx-react'
import { Tooltip2 } from '@blueprintjs/popover2'

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
            },
            language: { get }
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
                            <InputGroup placeholder="Title / Artist / Mapper" />
                            <ControlGroup>
                                <Label>Filters</Label>
                                <Switch label='Explicit' inline={true} />
                                <Switch label='Challenge' inline={true} />
                                <Switch label='Content Strike' inline={true} />
                            </ControlGroup>
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
                                            <p>Mapped by <a href={`mappers/${s.authorKey}`}>{s.author}</a></p>
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
                                                <SongCardAdditionalInfoValue>{s.atr}</SongCardAdditionalInfoValue>
                                                <Icon icon="key" onClick={()=>{}} />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.length}</SongCardAdditionalInfoValue>
                                                <Icon icon="time" />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                <SongCardAdditionalInfoValue>{s.avgBpm}</SongCardAdditionalInfoValue>
                                                <Icon icon="dashboard" />
                                            </SongCardAdditionalInfoRow>
                                            <SongCardAdditionalInfoRow>
                                                {s.contentStrike && (
                                                    <Tooltip2 content="Content Strike" placement="top" compact={true}>
                                                        <Icon icon="lightning" color="red" />
                                                    </Tooltip2>
                                                )}
                                                {s.explicit && (
                                                    <Tooltip2 content="Explicit" placement="top" compact={true}>
                                                        <Icon icon="high-priority" color="darkorange" />
                                                    </Tooltip2>
                                                )}
                                                {s.challenge && (
                                                    <Tooltip2 content="Challenge" placement="top" compact={true}>
                                                        <Icon icon="clean" color="gold" />
                                                    </Tooltip2>
                                                )}
                                            </SongCardAdditionalInfoRow>
                                        </SongCardAdditionalInfo>
                                        <SongCardActions>
                                            <Tooltip2 content={get('Songs.Action.CopyAtr')} placement="top" compact={true}>
                                                    <Button minimal={true} icon="duplicate" intent='primary' onClick={() => this.copyATR(s.atr)} />
                                                </Tooltip2>
                                            <Tooltip2 content={get('Songs.Action.Preview')} placement="top" compact={true}>
                                                <Button minimal={true} icon="video" intent='primary' />
                                            </Tooltip2>
                                            <Tooltip2 content={get('Songs.Action.DownloadZip')} placement="top" compact={true}>
                                                <Button minimal={true} icon="download" intent='primary' />
                                            </Tooltip2>
                                        </SongCardActions>
                                    </SongCardContent>
                                </SongCard>
                            ))}
                        </SongList>
                    </Ideal>
                )}
            </Container>
        )
    }

    copyATR = (atr: string) => {
        navigator.clipboard.writeText(`!atr ${atr}`)
    }
}

const Container = styled(Vertical)`
    max-width: 1300px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto;
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
`

const SearchArea = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    background: #F6F7F9;
    .bp4-dark & {
       background: #343A42;
    }
    padding: 15px;
`

const SongList = styled.div`
    padding-top: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 6px;
    width: 100%;
`

const SongCard = styled(Card)`
    padding: 10px;
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
    margin-right: 10px;
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

const SongCardActions = styled.div`
    width: 30px;
`

export default observer(Songs)