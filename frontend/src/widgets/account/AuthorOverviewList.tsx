import { observer } from 'mobx-react'
import React from 'react'
import Vertical from '../../components/layouts/Vertical'
import styled from 'styled-components'
import { Context } from '../../contexts'
import { Card, Divider, H5, NonIdealState, NonIdealStateIconSize, Text } from '@blueprintjs/core'

class AuthorOverviewList extends React.Component {


    render() {
        const {
            account: { loadedAuthors }
        } = Context

        return (
            <Container>
                {loadedAuthors.length === 0 && (
                    <NonIdealState
                        icon="map"
                        iconSize={NonIdealStateIconSize.SMALL}
                        title="No linked authors found"
                        description="There are no linked authors. Add a song to link it's author to the current account"
                    />
                )}
                {loadedAuthors.length > 0 && (
                    <AuthorList>
                        {loadedAuthors.map(author => (
                            <AuthorCard key={author.authorKey}>
                                <H5>
                                    {author.displayName}
                                </H5>
                                {author.description}
                            </AuthorCard>
                        ))}
                    </AuthorList>
                )}
            </Container>
        )
    }
}

const Container = styled(Vertical)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`

const AuthorList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 6px;
  width: 100%;
`

const AuthorCard = styled(Card)`

`

export default observer(AuthorOverviewList)