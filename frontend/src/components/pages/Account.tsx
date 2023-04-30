import { Button, Card, ControlGroup, Divider, H3, H4, InputGroup, Label, Tab, Tabs, TextArea } from '@blueprintjs/core'
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
                <Tabs onChange={this.handleMainTabChange}>
                    <Tab id="songs" title="Songs" icon="music" panel={
                        <>
                            <Divider />
                            <Tabs>
                                <Tab id="spub" title="Published" icon="eye-open" />
                                <Tab id="supub" title="Unpublished" icon="eye-off" />
                                <Tab id="sadd" title="Add song" icon="add" />
                            </Tabs>
                        </>
                    } />
                    <Tab id="playlists" title="Playlists" icon="list" panel={
                        <>
                            <Divider />
                            <Tabs>
                                <Tab id="ppub" title="Published" icon="eye-open" />
                                <Tab id="pupub" title="Unpublished" icon="eye-off" />
                                <Tab id="padd" title="Add playlist" icon="add" />
                            </Tabs>
                        </>
                    } />
                    <Tab id="aliases" title="Aliases" icon="layout-hierarchy" panel={
                        <>
                            <Divider />
                            <AliasList>
                                {loadedAuthors.map(a=> (
                                    <AliasListItem key={a.accountId}>
                                        {a.displayName}
                                        <Divider />
                                    </AliasListItem>
                                ))}
                            </AliasList>
                        </>
                    } />
                    <Tab id="account" title="Account" icon="person" panel={
                        <>
                            <Divider />
                            <AccountDetails fill={true} vertical={true}>
                                <H4>Account details</H4>
                                <Divider />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <Label>
                                    Email
                                    <InputGroup />
                                </Label>
                                <Button
                                    text="Change email"
                                    intent='success' />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <Label>
                                    Username
                                    <InputGroup />
                                </Label>
                                <Button
                                    text="Change username"
                                    intent='success' />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <Label>
                                    Description
                                    <TextArea fill={true} />
                                </Label>
                                <Button
                                    text="Change description"
                                    intent='success' />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <H4>Password</H4>
                                <Divider />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <Label>
                                    Current Password
                                    <InputGroup placeholder='Current Password' fill={true} />
                                </Label>
                                <Label>
                                    New Password
                                    <InputGroup placeholder='New Password' fill={true} />
                                    <InputGroup placeholder='Repeat Password' fill={true} />
                                </Label>
                                <Button
                                    text="Change password"
                                    intent='success' />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <H4>Delete account</H4>
                                <Divider />
                            </AccountDetails>
                            <AccountDetails fill={true} vertical={true}>
                                <Button
                                    text="Delete account"
                                    intent='danger' />
                            </AccountDetails>
                        </>
                    } />
                </Tabs>
            </Container>
        )
    }

    handleMainTabChange = () => {

    }
}

const Container = styled.div`
    max-width: 1300px;
    display: grid;
    grid-template-columns: repeat(1,1fr);
    margin: 15px auto;  
`

const AccountCard = styled(Card)`
    margin-bottom: 6px
`

const AccountDetails = styled(ControlGroup)`
    max-width: 600px;
    margin-top: 20px;
`

const AliasList = styled.div`

`

const AliasListItem = styled.div`

    margin-bottom: 20px;
`

export default observer(Account)