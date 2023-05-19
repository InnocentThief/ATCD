import React from 'react'
import { SongOverviewDto } from '../models/SongOverviewDto'
import styled from 'styled-components'
import {
  Button,
  Card,
  Colors,
  ControlGroup,
  H5,
  Icon,
  Tag,
} from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { Tooltip2 } from '@blueprintjs/popover2'
import { Context } from '../contexts'
import * as toaster from '../helpers/toaster'

interface Props {
  item: SongOverviewDto
}

const SongOverviewCard = ({ item }: Props) => {
  const {
    language: { get },
  } = Context

  const copyATR = (atr: string) => {
    navigator.clipboard.writeText(`!atr ${atr}`)
    toaster.success("ATR successfully copied")
  }

  const navigateToPreview = (url: string) => {
    window.open(url)
  }

  return (
    <SongCard>
      <img src={item.coverUrl} height={100} width={100} alt="" />
      <SongInfo vertical={true} fill={false}>
        <H5>
          <LinkWithWrap to={{ pathname: `songs/${item.songKey}` }}>
            {item.title} - {item.artist}
          </LinkWithWrap>
        </H5>
        <p>
          {`${get('Songs.SongInfo.MappedBy')} `}
          <LinkWithWrap to={{ pathname: `mappers/${item.authorKey}` }}>
            {item.author}
          </LinkWithWrap>
        </p>
        <p>
          <GenreTag round={true}>{item.genre}</GenreTag>
        </p>
        <ChoreoTags>
          {item.choreographies.slice().sort((c1, c2) => (c1.choreographyTypeId < c2.choreographyTypeId ? -1 : 1)).map(c => (
            <ChoreographyTag key={c.choreographyKey} itemType={c.choreographyType}>
              {c.displayName}
            </ChoreographyTag>
          ))}
        </ChoreoTags>
      </SongInfo>
      <SongInfo vertical={true} fill={false}>
        <SongCardAdditionalInfo>
          {item.atr}
          <Icon icon="key" onClick={() => { }} />
        </SongCardAdditionalInfo>
        <SongCardAdditionalInfo>
          {item.length}
          <Icon icon="time" />
        </SongCardAdditionalInfo>
        <SongCardAdditionalInfo>
          {item.avgBpm}
          <Icon icon="dashboard" />
        </SongCardAdditionalInfo>
        <SongCardSpecialInfo>
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
        </SongCardSpecialInfo>
      </SongInfo>
      <SongInfo vertical={true}>
        <Tooltip2
          content={get('Songs.Action.CopyAtr')}
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
          content={get('Songs.Action.Preview')}
          placement="top"
          compact={true}
        >
          <Button minimal={true} icon="video" intent="primary" onClick={() => navigateToPreview(item.previewURL)} />
        </Tooltip2>
        <Tooltip2
          content={get('Songs.Action.DownloadZip')}
          placement="top"
          compact={true}
        >
          <Button minimal={true} icon="download" intent="primary" />
        </Tooltip2>
      </SongInfo>
    </SongCard>
  )
}

const SongCard = styled(Card)`
  display: grid;
  grid-template-columns: 100px 1fr 80px 35px;
  padding: 10px;
`

const SongInfo = styled(ControlGroup)`
  margin: 0px 6px;
`

const LinkWithWrap = styled(Link)`
  white-space: pre-line;
  width: 100%;
`

const GenreTag = styled(Tag)`
  margin: 6px 0px;
`

const ChoreoTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ChoreographyTag = styled(Tag)`
  margin-right: 3px;
  margin-bottom: 3px;
  background: ${props =>
    props.itemType === 'Easy'
      ? Colors.FOREST3
      : props.itemType === 'Regular'
        ? Colors.CERULEAN3
        : props.itemType === 'Expert'
          ? Colors.VERMILION3
          : props.itemType === 'Cardio'
            ? Colors.INDIGO3
            : ''};
  .bp4-dark && {
    background: ${props =>
    props.itemType === 'Easy'
      ? Colors.FOREST3
      : props.itemType === 'Regular'
        ? Colors.CERULEAN3
        : props.itemType === 'Expert'
          ? Colors.VERMILION3
          : props.itemType === 'Cardio'
            ? Colors.INDIGO3
            : ''};
  }
`

const SongCardAdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin-top: 6px;
`

const SongCardSpecialInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 6px;
`

export default SongOverviewCard
