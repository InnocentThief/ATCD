import { Tab, Tabs } from '@blueprintjs/core'
import { Card } from '@blueprintjs/core/lib/esm/components/card/card'
import { H3 } from '@blueprintjs/core/lib/esm/components/html/html'
import { observer } from 'mobx-react'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'

interface Props extends RouteComponentProps<{ authorKey: string }>{}

class Author extends React.Component<Props>{
    async componentDidMount() {
        const {
            authors: { fetchAuthorDetail }
        } = Context

        await fetchAuthorDetail(this.props.match.params.authorKey)
    }

    render() {
        const{
            authors: { selectedAuthor }
        } = Context

        return(
            <Container>
                <AuthorCard>
                    <H3>{selectedAuthor?.displayName}</H3>
                </AuthorCard>
                <Tabs>
                    <Tab id="sng" title="Songs" />
                    <Tab id="pls" title="Playlists" />
                </Tabs>
            </Container>
            
        )
    }
}

const Container = styled(Vertical)`
    max-height: 100%;
`

const AuthorCard = styled(Card)`
    margin-bottom: 6px;
`

export default observer(Author)