import React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Vertical from '../layouts/Vertical'
import { Context } from '../../contexts'
import { observer } from 'mobx-react'
import { Card, H5 } from '@blueprintjs/core'

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
                <Card>
                    <SongCardContent>
                        <H5>
                            Songname
                        </H5>
                        {/* {selectedSong?.title} */}
                        Hallo
                    </SongCardContent>
                </Card>
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



export default observer(Song)