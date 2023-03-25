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
            auth: { currentAccount },
            settings: { isDarkTheme, swithTheme },
            language: { get }
        } = Context

        return (
            <Navbar style={{ zIndex: 1000 }}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>AUDIO TRIP CHOREOGRAPHIES</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className={Classes.MINIMAL} icon="music" text={get('AppBar.Songs')} onClick={this.swithToSongsPage} />
                    <Button className={Classes.MINIMAL} icon="map" text={get('AppBar.Mappers')} onClick={this.swithToMappersPage} />
                    <Button className={Classes.MINIMAL} icon="list" text={get('AppBar.Playlists')} onClick={this.swithToPlaylitsPage} />
                    {currentAccount && (
                        <>
                            <Navbar.Divider />
                            <Button className={Classes.MINIMAL} icon="user" text={currentAccount?.username} onClick={this.swithToAccountPage} />
                        </>
                    )} 
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button className={Classes.MINIMAL} icon={currentAccount? "log-out": "log-in" } text="" />
                    <Navbar.Divider />
                    <LanguageSelection />
                    <Button className={Classes.MINIMAL} icon={isDarkTheme ? "flash": "moon"} text="" onClick={swithTheme} />
                </Navbar.Group>
            </Navbar>
        )
    }

    swithToSongsPage = () =>{
        window.location.href = '/songs'
    }

    swithToMappersPage = () => {
        window.location.href = '/mappers'
    }

    swithToPlaylitsPage = () => {
        window.location.href = '/playlists'
    }

    swithToAccountPage = () => {
        window.location.href = '/account'
    }
}

export default withRouter(observer(AppBar))