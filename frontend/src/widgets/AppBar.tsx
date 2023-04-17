import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Context } from '../contexts'
import { observer } from 'mobx-react'
import { Alignment, Button, Classes, Navbar} from "@blueprintjs/core";
import { LanguageSelection } from './LanguageSelection';

interface Props extends RouteComponentProps<{}>{

}

class AppBar extends React.Component<Props>{
    render(){
        const {
            account: { currentAccount },
            auth: { logout },
            settings: { isDarkTheme, swithTheme: switchTheme },
            language: { get }
        } = Context

        return (
            <Navbar style={{ zIndex: 1000 }}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>AUDIO TRIP CHOREOGRAPHIES</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className={Classes.MINIMAL} icon="music" text={get('AppBar.Songs')} onClick={this.switchToSongsPage} />
                    <Button className={Classes.MINIMAL} icon="map" text={get('AppBar.Mappers')} onClick={this.switchToMappersPage} />
                    <Button className={Classes.MINIMAL} icon="list" text={get('AppBar.Playlists')} onClick={this.switchToPlaylitsPage} />
                    {currentAccount && (
                        <>
                            <Navbar.Divider />
                            <Button className={Classes.MINIMAL} icon="user" text={currentAccount?.username} onClick={this.switchToAccountPage} />
                        </>
                    )} 
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button className={Classes.MINIMAL} icon={currentAccount? "log-out": "log-in" } text="" onClick={currentAccount ? logout: this.switchToLoginPage} />
                    <Navbar.Divider />
                    <LanguageSelection />
                    <Button className={Classes.MINIMAL} icon={isDarkTheme ? "flash": "moon"} text="" onClick={switchTheme} />
                </Navbar.Group>
            </Navbar>
        )
    }

    switchToSongsPage = () =>{
        window.location.href = '/songs'
    }

    switchToMappersPage = () => {
        window.location.href = '/mappers'
    }

    switchToPlaylitsPage = () => {
        window.location.href = '/playlists'
    }

    switchToAccountPage = () => {
        window.location.href = '/account'
    }

    switchToLoginPage = () => {
        window.location.href = '/login'
    }
}

export default withRouter(observer(AppBar))