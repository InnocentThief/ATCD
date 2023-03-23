import { Card, H5 } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import Vertical from '../layouts/Vertical'

class Authors extends React.Component{
    async componentDidMount() {
        const {
            authors: { fetchAuthors }
        } = Context

        await fetchAuthors()
    }

    render() {
        const{
            authors: {
                loadedAuthors,
                loadingAuthors
            }
        } = Context

        return(
            <Container>
                {loadedAuthors.length > 0 && (
                    loadedAuthors.map(a=> (
                        <Card key={a.authorKey}>
                            <H5>{a.displayName}</H5>
                        </Card>
                    ))
                )}
            </Container>

            
        )
    }
}

const Container = styled(Vertical)`
    max-height: 100%;
`

export default observer(Authors)