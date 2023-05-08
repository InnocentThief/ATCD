import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Context } from "../contexts";
import { observer } from "mobx-react";
import { Alignment, Button, Classes, Navbar } from "@blueprintjs/core";
import { LanguageSelection } from "./LanguageSelection";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props extends RouteComponentProps<{}> {}

class AppBar extends React.Component<Props> {
  render() {
    const {
      account: { currentAccount },
      auth: { logout },
      settings: { isDarkTheme, swithTheme: switchTheme },
      language: { get },
    } = Context;

    return (
      <>
        <Navbar style={{ zIndex: 1000 }}>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>AUDIO TRIP CHOREOGRAPHIES</Navbar.Heading>
            <Navbar.Divider />
            <Link to={{ pathname: "/songs" }}>
              <Button
                className={Classes.MINIMAL}
                icon="music"
                text={get("AppBar.Songs")}
              />
            </Link>
            <Link to={{ pathname: "/mappers" }}>
              <Button
                className={Classes.MINIMAL}
                icon="map"
                text={get("AppBar.Mappers")}
              />
            </Link>
            <Link to={{ pathname: "/playlists" }}>
              <Button
                className={Classes.MINIMAL}
                icon="list"
                text={get("AppBar.Playlists")}
              />
            </Link>

            {currentAccount && (
              <>
                <Navbar.Divider />
                <Link to={{ pathname: "/account" }}>
                  <Button
                    className={Classes.MINIMAL}
                    icon="user"
                    text={currentAccount?.username}
                  />
                </Link>
              </>
            )}
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            {!currentAccount && (
              <Link to={{ pathname: "/login" }}>
                <Button className={Classes.MINIMAL} icon={"log-in"} text="" />
              </Link>
            )}
            {currentAccount && (
              <Button
                className={Classes.MINIMAL}
                icon={"log-out"}
                text=""
                onClick={logout}
              />
            )}

            <Navbar.Divider />
            <LanguageSelection />
            <Button
              className={Classes.MINIMAL}
              icon={isDarkTheme ? "flash" : "moon"}
              text=""
              onClick={switchTheme}
            />
          </Navbar.Group>
        </Navbar>
        <TopMargin />
      </>
    );
  }
}

const TopMargin = styled.div`
  position: fixed;
  width: 100%;
  height: 14px;
  background: #f6f7f9;
  .bp4-dark & {
    background: #343a42;
  }
`;

export default withRouter(observer(AppBar));
