import React from 'react'
import { observer } from 'mobx-react'
import { Context } from '../contexts'
import styled from 'styled-components'
import { Button, ControlGroup } from '@blueprintjs/core'

class SongsPaginate extends React.Component {
  render() {
    const {
      songs: { loadingSongs, loadedSongs },
      songSearch: { page, itemsPerPage, previous, next },
    } = Context

    return (
      <>
        {loadingSongs === false && (
          <Container vertical={false} fill={false}>
            <Button
              text="Previous"
              icon="arrow-left"
              disabled={page === 1}
              onClick={previous}
            />
            <Button text={`Page ${page}`} minimal={true} />
            <Button
              text="Next"
              rightIcon="arrow-right"
              disabled={loadedSongs.length < itemsPerPage}
              onClick={next}
            />
          </Container>
        )}
      </>
    )
  }
}

const Container = styled(ControlGroup)`
  margin-top: 15px;
  margin-bottom: 15px;
`

export default observer(SongsPaginate)
