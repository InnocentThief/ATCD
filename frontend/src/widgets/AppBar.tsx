import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Context } from '../contexts'
import { observer } from 'mobx-react'
import { Alignment, Button, Classes, Navbar} from "@blueprintjs/core";

interface Props extends RouteComponentProps<{}>{

}

class AppBar extends React.Component<Props>{
    render(){
        const {
            settings: { isDarkTheme, swithTheme }
        } = Context

        return (
            <Navbar style={{ zIndex: 1000 }}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>AUDIO TRIP CHOREOGRAPHIES</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className={Classes.MINIMAL} icon="music" text="Songs" onClick={this.swithToSongsPage} />
                    <Button className={Classes.MINIMAL} icon="map" text="Mappers" onClick={this.swithToMappersPage} />
                    <Button className={Classes.MINIMAL} icon="list" text="Playlists" onClick={this.swithToPlaylitsPage} />
                    <Navbar.Divider />
                    <Button className={Classes.MINIMAL} icon="user" text="InnocentThief" onClick={this.swithToAccountPage} />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button className={Classes.MINIMAL} icon="log-out" text="" />
                    <Navbar.Divider />
                    <Button className={Classes.MINIMAL} icon="translate" text="English" />
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