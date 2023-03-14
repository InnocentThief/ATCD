import { Button, Card, H5, NonIdealState, NonIdealStateIconSize, Tag } from '@blueprintjs/core'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import SongOverviewRow from '../../widgets/SongOverviewRow'
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
                loadedSongs            
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
                    {loadedSongs.length == 0 && (
                        <NonIdealState
                            icon="search"  
                            iconSize={NonIdealStateIconSize.SMALL}
                            title="No search results"
                            description={nonIdealStateDescription}
                        />
                    )}
                </NonIdeal>
                {loadedSongs.length > 0 && (
                    <List>
                        {loadedSongs.map(s => (
                            <SongCard>
                                <H5>
                                    {s.title} by {s.artist}
                                </H5>
                                <p>
                                    Mapped by {s.author}
                                </p>
                                <div>
                                    {s.choreographies.map(c => (
                                        <ChoreographyTag>
                                            {c.displayName}
                                        </ChoreographyTag>
                                    ))}
                                </div>
                            </SongCard>
                        ) )}
                    </List> 
                )}
            </Container>
        )
    }
}

const Container = styled(Vertical)`
  max-height: 100%;
`

const List = styled.div`
  overflow: auto;
`

const NonIdeal = styled.div`
  grid-area: nonideal;
  max-height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 50px;
`

const SongCard = styled(Card)`
    margin-bottom: 6px;
`

const ChoreographyTag = styled(Tag)`
    margin-right: 6px;
`

export default observer(Songs)