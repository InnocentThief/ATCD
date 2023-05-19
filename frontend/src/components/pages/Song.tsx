import React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Vertical from '../layouts/Vertical'
import { Context } from '../../contexts'
import { observer } from 'mobx-react'
import { Card, ControlGroup, Divider, Text, H3, H5, Colors, H4, NonIdealState, NonIdealStateIconSize, Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import * as toaster from '../../helpers/toaster'
import SongOverviewCard from '../../widgets/SongOverviewCard'
import { Tooltip2 } from '@blueprintjs/popover2'

interface Props extends RouteComponentProps<{ songKey: string }> { }

class Song extends React.Component<Props> {
  async componentDidMount() {
    const {
      songs: { fetchSongDetail },
    } = Context

    await fetchSongDetail(this.props.match.params.songKey)
  }

  render() {
    const {
      songs: { selectedSong, latestSongsByGenre, latestSongsByMapper },
      language: { get },
    } = Context

    return (
      <Container>
        <SongCard>
          <img src={selectedSong?.coverUrl} alt="" height="200" />
          <SongDescription vertical={true} fill={false}>
            <H3>
              {selectedSong?.title} - {selectedSong?.artist}
            </H3>
            {selectedSong?.description}
          </SongDescription>
          <SongActions vertical={true}>
            <Tooltip2
              content={get('Songs.Action.CopyAtr')}
              placement="top"
              compact={true}
            >
              <Button
                minimal={true}
                icon="duplicate"
                intent="primary"
                onClick={this.copyATR}
              />
            </Tooltip2>
            <Tooltip2
              content={get('Songs.Action.Preview')}
              placement="top"
              compact={true}
            >
              <Button minimal={true} icon="video" intent="primary" onClick={this.navigateToPreview} />
            </Tooltip2>
            <Tooltip2
              content={get('Songs.Action.DownloadZip')}
              placement="top"
              compact={true}
            >
              <Button minimal={true} icon="download" intent="primary" />
            </Tooltip2>
          </SongActions>
        </SongCard>
        <SongInfoChoreographies>
          <Card>
            <SongInfo>
              <Text>{get('Song.Detail.Key')}</Text>
              <Text>{selectedSong?.songKey}</Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.Mapper')}</Text>
              <Link to={{ pathname: `../mappers/${selectedSong?.authorKey}` }}>{selectedSong?.author}</Link>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.Published')}</Text>
              <Text>{selectedSong?.released}</Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.Genre')}</Text>
              <Text>{selectedSong?.genre}</Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.SongLenght')}</Text>
              <Text>{selectedSong?.length}</Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.AverageBpm')}</Text>
              <Text>{selectedSong?.avgBpm}</Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.Explicit')}</Text>
              <Text>
                {selectedSong?.explicit
                  ? `${get('Global.Yes')}`
                  : `${get('Global.No')}`}
              </Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.Challenge')}</Text>
              <Text>
                {selectedSong?.challenge
                  ? `${get('Global.Yes')}`
                  : `${get('Global.No')}`}
              </Text>
            </SongInfo>
            <SongInfoDivider />
            <SongInfo>
              <Text>{get('Song.Detail.ContentStrike')}</Text>
              <Text>
                {selectedSong?.contentStrike
                  ? `${get('Global.Yes')}`
                  : `${get('Global.No')}`}
              </Text>
            </SongInfo>
          </Card>
          <Card>
            {selectedSong?.choreographies.slice().sort((c1, c2) => (c1.choreographyTypeId < c2.choreographyTypeId ? -1 : 1)).map(c => (
              <Choreography key={c.choreographyKey} itemType={c.choreographyType} vertical={true}>
                <H5>
                  {c.displayName}
                </H5>
                <ChoreographyInfos>
                  <SongInfo>
                    <Text>GemSpeed</Text>
                    <Text>{c.gemSpeed}</Text>
                  </SongInfo>
                  <SongInfoDivider />
                  <SongInfo>
                    <Text>GemRadius</Text>
                    <Text>{c.gemRadius}</Text>
                  </SongInfo>
                </ChoreographyInfos>
              </Choreography>
            ))}
          </Card>
        </SongInfoChoreographies>
        <H4>{`Latest songs by mapper ${selectedSong?.author}`}</H4>
        <SongInfoDivider />
        {latestSongsByMapper.length === 0 && (
          <NonIdealState
            icon="music"
            iconSize={NonIdealStateIconSize.SMALL}
            title="No songs found"
            description={`No other songs found by mapper ${selectedSong?.author}`}
          />
        )}
        {latestSongsByMapper.length > 0 && (
          <SongList>
            {latestSongsByMapper &&
              latestSongsByMapper.map(song => (
                <SongOverviewCard key={song.songKey} item={song} />
              ))}
          </SongList>
        )}
        <H4>{`Latest songs of genre ${selectedSong?.genre}`}</H4>
        <SongInfoDivider />
        {latestSongsByGenre.length === 0 && (
          <NonIdealState
            icon="music"
            iconSize={NonIdealStateIconSize.SMALL}
            title="No songs found"
            description={`No other songs found for genre ${selectedSong?.genre}`}
          />
        )}
        {latestSongsByGenre.length > 0 && (
          <SongList>
            {latestSongsByGenre &&
              latestSongsByGenre.map(song => (
                <SongOverviewCard key={song.songKey} item={song} />
              ))}
          </SongList>
        )}
      </Container>
    )
  }

  copyATR = () => {
    const {
      songs: { selectedSong }
    } = Context

    navigator.clipboard.writeText(`!atr ${selectedSong?.atr}`)
    toaster.success("ATR successfully copied")
  }

  navigateToPreview = () => {
    const {
      songs: { selectedSong }
    } = Context
    if (selectedSong !== null) {
      window.open(selectedSong?.previewURL)
    }
  }
}

const Container = styled(Vertical)`
  max-width: 1300px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 15px auto;
`

const SongCard = styled(Card)`
  display: grid;
  grid-template-columns: 200px 1fr 35px;
  margin-bottom: 6px;
`

const SongDescription = styled(ControlGroup)`
  margin-left: 10px;
`
const SongInfoChoreographies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 6px;
  margin-bottom: 20px;
`

const SongInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`

const SongActions = styled(ControlGroup)`
  margin: 6px 6px;
`

const SongInfoDivider = styled(Divider)`
  margin: 6px 0px 6px 0px;
`

const Choreography = styled(ControlGroup)`
  border-style: solid;
  border-width: 2px;
  margin-bottom: 6px;
  padding: 6px;
  border-color: ${props =>
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
    border-color: ${props =>
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

const ChoreographyInfos = styled.div`
    margin-top: 6px;
`

const SongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 6px;
  width: 100%;
  margin-bottom: 20px;
`

export default observer(Song)
