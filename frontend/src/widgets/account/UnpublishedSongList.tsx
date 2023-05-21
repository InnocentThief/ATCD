import React from 'react'
import { observer } from "mobx-react"
import { Context } from '../../contexts'
import Vertical from '../../components/layouts/Vertical'
import styled from 'styled-components'
import { Button, Card, Colors, ControlGroup, H5, Icon, NonIdealState, NonIdealStateIconSize, Tag } from '@blueprintjs/core'
import { Tooltip2 } from '@blueprintjs/popover2'

class UnpublishedSongList extends React.Component {
    async componentDidMount() {
        const {
            account: { fetchUnpublishedSongs }
        } = Context

        await fetchUnpublishedSongs()
    }

    render() {
        const {
            account: { loadedUnpublishedSongs }
        } = Context
        return (
            <Container>
                {loadedUnpublishedSongs.length === 0 && (
                    <NonIdealState
                        icon="music"
                        iconSize={NonIdealStateIconSize.SMALL}
                        title="No unpublished songs found"
                        description="There are no unpublished songs yet. Newly added songs will be added to the unpublished songs list"
                    />
                )}
                {loadedUnpublishedSongs.length > 0 && (
                    <SongList>
                        {loadedUnpublishedSongs.map(song => (
                            <SongCard key={song.songKey}>
                                <img src={song.coverUrl} height={100} width={100} alt="" />
                                <SongInfo vertical={true} fill={false}>
                                    <H5>
                                        {song.title}
                                    </H5>
                                    {song.artist}
                                    <p>
                                        <GenreTag round={true}>{song.genre}</GenreTag>
                                    </p>
                                    <ChoreoTags>
                                        {song.choreographies.slice().sort((c1, c2) => (c1.choreographyTypeId < c2.choreographyTypeId ? -1 : 1)).map(c => (
                                            <ChoreographyTag key={c.choreographyKey} itemType={c.choreographyType}>
                                                {c.displayName}
                                            </ChoreographyTag>
                                        ))}
                                    </ChoreoTags>
                                </SongInfo>
                                <SongInfo vertical={true} fill={false}>
                                    <SongCardAdditionalInfo>
                                        {song.atr}
                                        <Icon icon="key" onClick={() => { }} />
                                    </SongCardAdditionalInfo>
                                    <SongCardAdditionalInfo>
                                        {song.length}
                                        <Icon icon="time" />
                                    </SongCardAdditionalInfo>
                                    <SongCardAdditionalInfo>
                                        {song.avgBpm}
                                        <Icon icon="dashboard" />
                                    </SongCardAdditionalInfo>
                                    <SongCardSpecialInfo>
                                        {song.contentStrike && (
                                            <Tooltip2 content="Content Strike" placement="top" compact={true}>
                                                <Icon icon="lightning" color="red" />
                                            </Tooltip2>
                                        )}
                                        {song.explicit && (
                                            <Tooltip2 content="Explicit" placement="top" compact={true}>
                                                <Icon icon="high-priority" color="darkorange" />
                                            </Tooltip2>
                                        )}
                                        {song.challenge && (
                                            <Tooltip2 content="Challenge" placement="top" compact={true}>
                                                <Icon icon="clean" color="gold" />
                                            </Tooltip2>
                                        )}
                                    </SongCardSpecialInfo>
                                </SongInfo>
                                <SongInfo vertical={true}>
                                    <Tooltip2
                                        content="Edit"
                                        placement="top"
                                        compact={true}
                                    >
                                        <Button
                                            minimal={true}
                                            icon="edit"
                                            intent="primary"
                                        />
                                    </Tooltip2>
                                    <Tooltip2
                                        content="Publish"
                                        placement="top"
                                        compact={true}
                                    >
                                        <Button minimal={true} icon="eye-on" intent="primary" />
                                    </Tooltip2>
                                    <Tooltip2
                                        content="Delete"
                                        placement="top"
                                        compact={true}
                                    >
                                        <Button minimal={true} icon="trash" intent="primary" />
                                    </Tooltip2>
                                </SongInfo>
                            </SongCard>
                        ))}
                    </SongList>
                )}
            </Container>
        )
    }
}

const Container = styled(Vertical)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`

const SongList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 6px;
  width: 100%;
`

const SongCard = styled(Card)`
  display: grid;
  grid-template-columns: 100px 1fr 80px 35px;
  padding: 10px;
`

const SongInfo = styled(ControlGroup)`
  margin: 0px 6px;
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

export default observer(UnpublishedSongList)