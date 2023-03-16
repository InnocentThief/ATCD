import { observer } from 'mobx-react'
import React from 'react'
import {
   Route,
   RouteComponentProps,
   Switch,
   withRouter
 } from 'react-router-dom'
import { Context } from '../contexts'
import styled from 'styled-components/macro'
import AppBar from '../widgets/AppBar'
import Songs from './pages/Songs'
import Mappers from './pages/Mappers'
import Playlists from './pages/Playlists'
import Account from './pages/Account'
import Mapper from './pages/Mapper'
import Song from './pages/Song'
import { Colors } from '@blueprintjs/core';
import { Alignment, Button, Classes, Navbar} from "@blueprintjs/core";

export const SONGS_ROUTE = "/songs"
export const MAPPERS_ROUTE = "/mappers"
export const PLAYLISTS_ROUTE = "/playlists"
export const ACCOUNT_ROUTE = "/account"

interface Props extends RouteComponentProps {}

class Router extends React.Component<Props>{
   render() {
      const{
         settings: { isDarkTheme }
      } = Context

      return (
         <Container className={isDarkTheme ?  Classes.DARK: ""}>
            <Fixed>
               <AppBar />
            </Fixed>
            <Content>
               <Main>
                  <Switch>
                     <Route exact path={SONGS_ROUTE} component={Songs} />
                     <Route exact path={`${SONGS_ROUTE}/:songKey`} component={Song} />
                     <Route exact path={MAPPERS_ROUTE} component={Mappers} />
                     <Route exact path={`${MAPPERS_ROUTE}/:authorKey`} component={Mapper} />
                     <Route exact path={PLAYLISTS_ROUTE} component={Playlists} />
                     <Route exact path={ACCOUNT_ROUTE} component={Account} />
                  </Switch>
               </Main>
            </Content>
         </Container>
      )
   }
}

const Container = styled.div`
   height: 100% !important
`

const Fixed = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  padding-top: 50px;
  background: #F6F7F9;
  .bp4-dark & {
      background: #343A42;
  }
`

const Main = styled.main`
  flex: 1;
  margin: 15px;
`

export default withRouter(observer(Router))