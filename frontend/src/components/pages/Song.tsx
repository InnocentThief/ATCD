import React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Vertical from '../layouts/Vertical'
import { Context } from '../../contexts'
import { observer } from 'mobx-react'
import { Card, Divider, H3, H5 } from '@blueprintjs/core'

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
            songs: { selectedSong }
        } = Context

        return(
            <Container>
                <Card elevation={2}>
                    <H3>
                        {selectedSong?.title} - {selectedSong?.artist}
                    </H3>
                    <SongCardContent>
                        <SongCardCover>
                            <img src={selectedSong?.coverUrl} height="200" />
                        </SongCardCover>
                        {selectedSong?.description}
                    </SongCardContent>
                </Card>
                <Choreographies elevation={2}>
                    {selectedSong?.choreographies.map(c => (
                        <Choreography key={c.choreographyKey}>
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
                        </Choreography>
                    ))}
                </Choreographies>
            </Container>
        )
    }
}

const Container = styled(Vertical)`
    max-height: 100%;
`

const SongCardContent = styled.div`
    display: flex;
`

const SongCardCover = styled.div`
    margin-right: 10px;
`

const Choreographies = styled(Card)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    margin-top: 10px;
`

const Choreography = styled.div`
    height: 50px;
    min-width: 100px;
    margin-bottom: 3px;
    margin-right: 6px;
    background: red;
    padding: 3px;
`

const ChoreographyInfos = styled.div`
    display: flex;
`

const ChoreographyInfo = styled.div`
    display: flex;
    margin-bottom: 6px;
    margin-right: 10px
`



export default observer(Song)