import { Tab, Tabs } from "@blueprintjs/core";
import { Card } from "@blueprintjs/core/lib/esm/components/card/card";
import { H3 } from "@blueprintjs/core/lib/esm/components/html/html";
import { observer } from "mobx-react";
import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { Context } from "../../contexts";
import Vertical from "../layouts/Vertical";

interface Props extends RouteComponentProps<{ authorKey: string }> { }

class Author extends React.Component<Props> {
  async componentDidMount() {
    const {
      authors: { fetchAuthorDetail },
    } = Context;

    await fetchAuthorDetail(this.props.match.params.authorKey);
  }

  render() {
    const {
      authors: { selectedAuthor },
    } = Context;

    return (
      <Container>
        <AuthorCard>
          <H3>{selectedAuthor?.displayName}</H3>
        </AuthorCard>
        <Tabs>
          <Tab id="sng" title="Songs" icon="music" />
          <Tab id="pls" title="Playlists" icon="list" />
        </Tabs>
      </Container>
    );
  }
}

const Container = styled(Vertical)`
  max-width: 1300px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 15px auto;
`;

const AuthorCard = styled(Card)`
  margin-bottom: 6px;
`;

export default observer(Author);
