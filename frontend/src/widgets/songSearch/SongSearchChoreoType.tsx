import { ControlGroup, Intent, TagProps } from '@blueprintjs/core'
import { MenuItem2 } from '@blueprintjs/popover2'
import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select'
import { observer } from 'mobx-react'
import React from 'react'
import {
  arrayContainsChoreoType,
  ChoreographyType,
  areChoreoTypesEqual,
  filterChoreoType,
  getItemProps,
  CHOREOGRAPHY_TYPES,
} from '../../helpers/choreographyTypes'
import styled from 'styled-components'
import { Context } from '../../contexts'

class SongSearchChoreoType extends React.Component {
  render() {
    const {
      songSearch: { selectedChoreoTypes },
      language: { get },
    } = Context

    const getTagProps = (_value: React.ReactNode): TagProps => ({
      intent: Intent.NONE,
      minimal: false,
    })

    return (
      <AdvancedSearchControlGroup vertical={true} fill={true}>
        <AdvancedSearchLabel>
          {get('SongSearch.ChoreographyType.Label')}
        </AdvancedSearchLabel>
        <MultiSelect2<ChoreographyType>
          initialContent={undefined}
          itemPredicate={filterChoreoType}
          itemRenderer={this.renderChoreoType}
          items={CHOREOGRAPHY_TYPES}
          itemsEqual={areChoreoTypesEqual}
          menuProps={{ 'aria-label': 'Choregraphy Types' }}
          noResults={
            <MenuItem2
              disabled={true}
              text="No results."
              roleStructure="listoption"
            />
          }
          onClear={this.handleChoreoTypesClear}
          onItemSelect={this.handleChoreoTypeSelect}
          placeholder={get('SongSearch.ChoreographyType.Placeholder')}
          resetOnSelect={true}
          selectedItems={selectedChoreoTypes}
          tagRenderer={this.renderTag}
          tagInputProps={{
            onRemove: this.handleTagRemove,
            tagProps: getTagProps,
          }}
        />
      </AdvancedSearchControlGroup>
    )
  }

  private renderTag = (choreographyType: ChoreographyType) =>
    choreographyType.displayName

  private renderChoreoType: ItemRenderer<ChoreographyType> = (choreoType, props) => {
    if (!props.modifiers.matchesPredicate) {
      return null
    }

    return (
      <MenuItem2
        {...getItemProps(choreoType, props)}
        selected={this.isChoreoTypeSelected(choreoType)}
        shouldDismissPopover={false}
        text={choreoType.displayName}
      />
    )
  }

  private handleTagRemove = (_tag: React.ReactNode, index: number) => {
    this.deselectChoreoType(index)
  }

  private getSelectedChoreoTypeIndex(choreoType: ChoreographyType) {
    const {
      songSearch: { selectedChoreoTypes },
    } = Context
    return selectedChoreoTypes.indexOf(choreoType)
  }

  private isChoreoTypeSelected(choreoType: ChoreographyType) {
    return this.getSelectedChoreoTypeIndex(choreoType) !== -1
  }

  private selectChoreoType(choreoType: ChoreographyType) {
    this.selectChoreoTypes([choreoType])
  }

  private selectChoreoTypes(choreoTypesToSelect: ChoreographyType[]) {
    const {
      songSearch: { selectedChoreoTypes, updateSelectedChoreoTypes },
    } = Context

    let nextChoreoTypes = selectedChoreoTypes.slice()

    choreoTypesToSelect.forEach(choreoType => {
      nextChoreoTypes = !arrayContainsChoreoType(nextChoreoTypes, choreoType) ? [...nextChoreoTypes, choreoType] : nextChoreoTypes
    })
    updateSelectedChoreoTypes(nextChoreoTypes)
  }

  private deselectChoreoType(index: number) {
    const {
      songSearch: { selectedChoreoTypes, updateSelectedChoreoTypes },
    } = Context

    let currentChoreoTypes = selectedChoreoTypes.slice()
    let nextChoreoTypes = currentChoreoTypes.filter((_choreoType, i) => i !== index)
    updateSelectedChoreoTypes(nextChoreoTypes)
  }

  private handleChoreoTypeSelect = (choreoType: ChoreographyType) => {
    if (!this.isChoreoTypeSelected(choreoType)) {
      this.selectChoreoType(choreoType)
    } else {
      this.deselectChoreoType(this.getSelectedChoreoTypeIndex(choreoType))
    }
  }

  private handleChoreoTypesClear = () => {
    const {
      songSearch: { clearSelectedChoreoTypes }
    } = Context
    clearSelectedChoreoTypes()
  }
}

const AdvancedSearchLabel = styled.div`
  margin-bottom: 6px;
`

const AdvancedSearchControlGroup = styled(ControlGroup)`
  margin-bottom: 10px;
`

export default observer(SongSearchChoreoType)
