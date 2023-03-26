import { Card, H3, H5, Tab, Tabs } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'



class Account extends React.Component{
    async componentDidMount() {
        const {
            account: { fetchAuthors }
        } = Context

        await fetchAuthors()
    }


    render() {
        const{
            account: { currentAccount, loadedAuthors }
        } = Context

        return(
            <Container>
                <AccountCard>
                    <H3>{currentAccount?.username}</H3>
                    {currentAccount?.email}
                </AccountCard>
                <AliasCard>
                    <H5>Aliases (Song Author)</H5>
                    <AliasList>
                        {loadedAuthors.map(a => (
                            <AuthorCard key={a.authorKey} elevation={2}>
                                <H5>{a.displayName} ({a.platformId})</H5>
                                {a.description}
                            </AuthorCard>
                        ))
                        }
                    </AliasList>
                </AliasCard>
                <Tabs>
                    <Tab id="sng" title="Songs" icon="music" />
                    <Tab id="sng" title="Playlists" icon="list" />
                </Tabs>
            </Container>
        )
    }
}

const Container = styled.div`
    max-height: 100%;       
`

const AccountCard = styled(Card)`
    margin-bottom: 6px
`

const AliasCard = styled(Card)`
    margin-bottom: 6px;
`

const AliasList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 6px;
    width: 100%;
`

const AuthorCard = styled(Card)`

`


export default observer(Account)