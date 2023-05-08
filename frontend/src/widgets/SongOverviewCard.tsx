import React from "react";
import { SongOverviewDto } from "../models/SongOverviewDto";
import styled from "styled-components";
import { Button, Card, Divider, H5, Icon, Tag } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Context } from "../contexts";

interface Props {
  item: SongOverviewDto;
}

const SongOverviewCard = ({ item }: Props) => {
  const {
    language: { get },
  } = Context;

  const copyATR = (atr: string) => {
    navigator.clipboard.writeText(`!atr ${atr}`);
  };

  return (
    <SongCard>
      <SongCardCover>
        <img src={item.coverUrl} height={100} width={100} alt="" />
      </SongCardCover>
      <SongCardSongInfo>
        <H5>
          <Link to={{ pathname: `songs/${item.songKey}` }}>
            {item.title} - {item.artist}
          </Link>
        </H5>
        <p>
          Mapped by{" "}
          <Link to={{ pathname: `mappers/${item.authorKey}` }}>
            {item.author}
          </Link>
        </p>
        <SongCardGenreChoreographyInfo>
          <GenreTag round={true}>{item.genre}</GenreTag>
          <Divider />
          {item.choreographies.map((c) => (
            <ChoreographyTag key={c.choreographyKey}>
              {c.choreographyType} ({c.displayName})
            </ChoreographyTag>
          ))}
        </SongCardGenreChoreographyInfo>
      </SongCardSongInfo>
      <SongCardAdditionalInfo>
        <SongCardAdditionalInfoRow>
          <SongCardAdditionalInfoValue>{item.atr}</SongCardAdditionalInfoValue>
          <Icon icon="key" onClick={() => {}} />
        </SongCardAdditionalInfoRow>
        <SongCardAdditionalInfoRow>
          <SongCardAdditionalInfoValue>
            {item.length}
          </SongCardAdditionalInfoValue>
          <Icon icon="time" />
        </SongCardAdditionalInfoRow>
        <SongCardAdditionalInfoRow>
          <SongCardAdditionalInfoValue>
            {item.avgBpm}
          </SongCardAdditionalInfoValue>
          <Icon icon="dashboard" />
        </SongCardAdditionalInfoRow>
        <SongCardAdditionalInfoRow>
          {item.contentStrike && (
            <Tooltip2 content="Content Strike" placement="top" compact={true}>
              <Icon icon="lightning" color="red" />
            </Tooltip2>
          )}
          {item.explicit && (
            <Tooltip2 content="Explicit" placement="top" compact={true}>
              <Icon icon="high-priority" color="darkorange" />
            </Tooltip2>
          )}
          {item.challenge && (
            <Tooltip2 content="Challenge" placement="top" compact={true}>
              <Icon icon="clean" color="gold" />
            </Tooltip2>
          )}
        </SongCardAdditionalInfoRow>
      </SongCardAdditionalInfo>
      <SongCardActions>
        <Tooltip2
          content={get("Songs.Action.CopyAtr")}
          placement="top"
          compact={true}
        >
          <Button
            minimal={true}
            icon="duplicate"
            intent="primary"
            onClick={() => copyATR(item.atr)}
          />
        </Tooltip2>
        <Tooltip2
          content={get("Songs.Action.Preview")}
          placement="top"
          compact={true}
        >
          <Button minimal={true} icon="video" intent="primary" />
        </Tooltip2>
        <Tooltip2
          content={get("Songs.Action.DownloadZip")}
          placement="top"
          compact={true}
        >
          <Button minimal={true} icon="download" intent="primary" />
        </Tooltip2>
      </SongCardActions>
    </SongCard>
  );
};

const SongCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const SongCardCover = styled.div`
  margin-right: 10px;
`;

const SongCardSongInfo = styled.div`
  width: 100%;
`;

const SongCardGenreChoreographyInfo = styled.div`
  display: flex;
  flex-direction: row;
`;
const GenreTag = styled(Tag)`
  margin-right: 3px;
`;

const ChoreographyTag = styled(Tag)`
  margin-left: 3px;
  margin-right: 3px;
`;

const SongCardAdditionalInfo = styled.div`
  margin-right: 10px;
  width: 150px;
`;

const SongCardAdditionalInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const SongCardAdditionalInfoValue = styled.div`
  margin-right: 10px;
`;

const SongCardActions = styled.div`
  width: 30px;
`;

export default SongOverviewCard;
