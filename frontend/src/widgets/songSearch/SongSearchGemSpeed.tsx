import { ControlGroup, Intent, MultiSlider } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Context } from '../../contexts'

class SongSearchGemSpeed extends React.Component {
  render() {
    const {
      language: { get },
    } = Context
    return (
      <AdvancedSearchControlGroup vertical={true} fill={true}>
        <AdvancedSearchLabel>
          {get('SongSearch.GemSpeed.Label')}
        </AdvancedSearchLabel>
        <MultiSlider>
          <MultiSlider.Handle
            value={3}
            type="start"
            intentAfter={Intent.PRIMARY}
          />
          <MultiSlider.Handle value={8} type="end" />
        </MultiSlider>
      </AdvancedSearchControlGroup>
    )
  }
}

const AdvancedSearchLabel = styled.div`
  margin-bottom: 6px;
`

const AdvancedSearchControlGroup = styled(ControlGroup)`
  margin-bottom: 10px;
`

export default observer(SongSearchGemSpeed)
