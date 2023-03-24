import React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Vertical from '../layouts/Vertical'
import { Context } from '../../contexts'
import { observer } from 'mobx-react'
import { Card, ControlGroup, Divider, Text, H3, H5 } from '@blueprintjs/core'

interface Props extends RouteComponentProps<{ songKey: string }>{}

class Song extends React.Component<Props>{
    async componentDidMount() {
        const {
            songs: { fetchSongDetail }
        } = Context

        await fetchSongDetail(this.props.match.params.songKey)
    }

    render() {
        const{
            songs: { selectedSong },
            language: { get }
        } = Context

        return(
            <Container>
                <SongCard>
                    <H3>{selectedSong?.title} - {selectedSong?.artist}</H3>
                    <SongCardContent>
                        <SongCardContentCover>
                            <img src={selectedSong?.coverUrl} height="200" />
                        </SongCardContentCover>
                        {selectedSong?.description}
                    </SongCardContent>
                </SongCard>
                <SongInfoChoreographies>
                    <SongInfoCard>
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.Key')}</Text>
                            <SongInfoValue>{selectedSong?.songKey}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.Mapper')}</Text>
                            <SongInfoValue><a href={`../mappers/${selectedSong?.authorKey}`}>{selectedSong?.author}</a></SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.Published')}</Text>
                            <SongInfoValue>{selectedSong?.released}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.Genre')}</Text>
                            <SongInfoValue>{selectedSong?.genre}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.SongLenght')}</Text>
                            <SongInfoValue>{selectedSong?.length}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.AverageBpm')}</Text>
                            <SongInfoValue>{selectedSong?.avgBpm}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.Explicit')}</Text>
                            <SongInfoValue>{selectedSong?.explicit? `${get('Global.Yes')}`: `${get('Global.No')}`}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.Challenge')}</Text>
                            <SongInfoValue>{selectedSong?.challenge? `${get('Global.Yes')}`: `${get('Global.No')}`}</SongInfoValue>
                        </SongInfo>
                        <SongInfoDivider />
                        <SongInfo fill={true} vertical={false}>
                            <Text>{get('Song.Detail.ContentStrike')}</Text>
                            <SongInfoValue>{selectedSong?.contentStrike? `${get('Global.Yes')}`: `${get('Global.No')}`}</SongInfoValue>
                        </SongInfo>
                    </SongInfoCard>
                    <ChoreographiesCard>
                        {selectedSong?.choreographies.map(c => (
                            <Choreography key={c.choreographyKey} onClick={()=> {}}>
                                <H5>{c.choreographyType} ({c.displayName})</H5>
                                <ChoreographyInfos>
                                    <ChoreographyInfo>
                                        GemSpeed
                                        <Divider />
                                        {c.gemSpeed} 
                                    </ChoreographyInfo>
                                    <ChoreographyInfo>
                                        GemRadius
                                        <Divider />
                                        {c.gemRadius} 
                                    </ChoreographyInfo>
                                </ChoreographyInfos>
                                <ChoreographyDivider />
                            </Choreography>
                        ))}
                    </ChoreographiesCard>
                </SongInfoChoreographies>
                <ScoreCard>

                </ScoreCard>
            </Container>
        )
    }
}

const Container = styled(Vertical)`
    max-height: 100%;
`

const SongCard = styled(Card)`
    margin-bottom: 6px;
`

const SongCardContent = styled.div`
    display: flex;
`

const SongCardContentCover = styled.div`
    margin-right: 6px;
`

const SongInfoChoreographies = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 6px;
    margin-bottom: 6px;
`

const SongInfoCard = styled(Card)`
    
`

const SongInfo = styled(ControlGroup)`

`

const SongInfoDivider = styled(Divider)`
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 6px;
    margin-bottom: 6px;
`

const SongInfoValue = styled(Text)`
    text-align: right;
`

const ChoreographiesCard = styled(Card)`
    
`

const Choreography = styled.div`
    height: 50px;
    padding: 3px;
    margin-bottom: 20px;
`

const ChoreographyDivider = styled(Divider)`
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 6px;
    margin-bottom: 6px;
`

const ChoreographyInfos = styled.div`
    display: flex;
`

const ChoreographyInfo = styled.div`
    display: flex;
    margin-bottom: 6px;
    margin-right: 10px
`

const ScoreCard = styled(Card)`

`



// const SongCardContent = styled.div`
//     display: flex;
// `

// const SongCardCover = styled.div`
//     margin-right: 10px;
// `

// const Choreographies = styled(Card)`
//     margin-top: 10px;
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//     gap: 6px;
// `





export default observer(Song)