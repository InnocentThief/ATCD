import {
  Button,
  Card,
  ControlGroup,
  Divider,
  H3,
  H4,
  InputGroup,
  Intent,
  Label,
  Tab,
  Tabs,
  TextArea,
} from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'
import AuthorOverviewList from '../../widgets/account/AuthorOverviewList'
import PublishedSongList from '../../widgets/account/PublishedSongList'
import UnpublishedSongList from '../../widgets/account/UnpublishedSongList'
import AddSong from '../../widgets/account/AddSong'

class Account extends React.Component {
  async componentDidMount() {
    const {
      account: { fetchAuthors },
    } = Context

    await fetchAuthors()
  }

  render() {
    const {
      account: { currentAccount },
    } = Context

    return (
      <Container>
        <AccountCard>
          <H3>{currentAccount?.username}</H3>
          {currentAccount?.email}
        </AccountCard>
        <Tabs onChange={this.handleMainTabChange}>
          <Tab
            id="songs"
            title="Songs"
            icon="music"
            panel={
              <Tabs>
                <Tab id="spub" title="Published" icon="eye-open" panel={<PublishedSongList />} />
                <Tab id="supub" title="Unpublished" icon="eye-off" panel={<UnpublishedSongList />} />
                <Tab id="sadd" title="Add song" icon="add" panel={<AddSong />} />
              </Tabs>
            }
          />
          <Tab
            id="playlists"
            title="Playlists"
            icon="list"
            panel={
              <Tabs>
                <Tab id="ppub" title="Published" icon="eye-open" />
                <Tab id="pupub" title="Unpublished" icon="eye-off" />
                <Tab id="padd" title="Add playlist" icon="add" />
              </Tabs>
            }
          />
          <Tab
            id="aliases"
            title="Aliases"
            icon="layout-hierarchy"
            panel={<AuthorOverviewList />}
          />
          <Tab
            id="account"
            title="Account"
            icon="person"
            panel={
              <>
                <AccountDetails fill={true} vertical={true}>
                  <H4>Account details</H4>
                  <Divider />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <Label>
                    Email
                    <InputGroup />
                  </Label>
                  <Button text="Change email" intent={Intent.SUCCESS} />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <Label>
                    Username
                    <InputGroup />
                  </Label>
                  <Button text="Change username" intent={Intent.SUCCESS} />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <Label>
                    Description
                    <TextArea fill={true} />
                  </Label>
                  <Button text="Change description" intent={Intent.SUCCESS} />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <H4>Password</H4>
                  <Divider />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <Label>
                    Current Password
                    <InputGroup placeholder="Current Password" fill={true} />
                  </Label>
                  <Label>
                    New Password
                    <InputGroup placeholder="New Password" fill={true} />
                    <InputGroup placeholder="Repeat Password" fill={true} />
                  </Label>
                  <Button text="Change password" intent={Intent.SUCCESS} />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <H4>Delete account</H4>
                  <Divider />
                </AccountDetails>
                <AccountDetails fill={true} vertical={true}>
                  <Button text="Delete account" intent="danger" />
                </AccountDetails>
              </>
            }
          />
        </Tabs>
      </Container>
    )
  }

  handleMainTabChange = () => { }
}

const Container = styled.div`
  max-width: 1300px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 15px auto;
`

const AccountCard = styled(Card)`
  margin-bottom: 6px;
`

const AccountDetails = styled(ControlGroup)`
  max-width: 600px;
  margin-top: 20px;
`

export default observer(Account)
