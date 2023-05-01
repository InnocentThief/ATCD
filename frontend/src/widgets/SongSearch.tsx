import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { CHOREOGRAPHY_TYPES, ChoreographyType, areChoreoTypesEqual, arrayContainsChoreoType, filterChoreoType, getChoreoTypeItemProps } from '../components/layouts/ChoreographyTypes';
import { DateRange, DateRangeInput2 } from '@blueprintjs/datetime2';
import { Button, Collapse, ControlGroup, InputGroup, Intent, Label, MultiSlider, TagProps } from '@blueprintjs/core';
import { CancelablePromise, makeCancelablePromise } from '../helpers/promise';
import { Context } from '../contexts';
import { observer } from 'mobx-react';
import { ItemRenderer, ItemRendererProps, MultiSelect2 } from '@blueprintjs/select';
import { MenuItem2 } from '@blueprintjs/popover2';
import { format } from 'date-fns'
import styled from 'styled-components';

interface IState {
    advancedSearchVisible: boolean
    choreographyTypes_items: ChoreographyType[]
    choreoTypes_selectedItems: ChoreographyType[]
    published_range: DateRange
    searchText: string
}

class SongSearch extends React.Component {
    state: IState = {
        advancedSearchVisible: false,
        choreographyTypes_items: CHOREOGRAPHY_TYPES,
        choreoTypes_selectedItems: [],
        published_range: [null, null],
        searchText: "",
    }

    componentWillUnmount(): void {
        if (this.searchPromise) {
            this.searchPromise.cancel()
        }
    }
        
    private searchPromise: CancelablePromise<void> | undefined

    render() {

        const locales: { [localeCode: string]: Locale } = require("date-fns/locale");
        const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

        function maybeGetLocaleOptions (
            localeCode: string | undefined
          ): { locale: Locale } | undefined {
            if (localeCode == null || locales[localeCode] == null) return undefined;
            return { locale: locales[localeCode] };
          }

        const getTagProps = (_value: React.ReactNode, index: number): TagProps => ({
            intent: Intent.NONE,
            minimal: false
        })

        return (
            <Container>
                <ControlGroup>
                    <InputGroup 
                        type='search'
                        leftIcon="search"
                        placeholder='Song name / Artist / Mapper' 
                        fill={true}
                        value={this.state.searchText}
                        onChange={this.updateSearchText}
                        onKeyPress={this.handleEnter}
                    />
                    <Button onClick={this.handleAdvancedSearchVisibleClick} icon='settings'>
                        {this.state.advancedSearchVisible ? "Hide": "Show"} advanced search
                    </Button>
                </ControlGroup>
                <Collapse isOpen={this.state.advancedSearchVisible}>
                    <SearchDetails>
                        <Label>
                            Exclude
                            <MultiSelect2 placeholder='Select one or many' selectedItems={[]} tagRenderer={function (item: unknown): React.ReactNode {
                                throw new Error('Function not implemented.')
                            } } items={[]} itemRenderer={function (item: unknown, itemProps: ItemRendererProps<HTMLLIElement>): JSX.Element | null {
                                throw new Error('Function not implemented.')
                            } } onItemSelect={function (item: unknown, event?: React.SyntheticEvent<HTMLElement, Event> | undefined): void {
                                throw new Error('Function not implemented.')
                            } }                                            
                            />
                        </Label>
                        <Label>
                            Genre
                            <MultiSelect2 placeholder='Select one or many' selectedItems={[]} tagRenderer={function (item: unknown): React.ReactNode {
                                throw new Error('Function not implemented.')
                            } } items={[]} itemRenderer={function (item: unknown, itemProps: ItemRendererProps<HTMLLIElement>): JSX.Element | null {
                                throw new Error('Function not implemented.')
                            } } onItemSelect={function (item: unknown, event?: React.SyntheticEvent<HTMLElement, Event> | undefined): void {
                                throw new Error('Function not implemented.')
                            } }                                            
                            />
                        </Label>
                        <Label>
                            Choreography Type
                            <MultiSelect2<ChoreographyType> 
                                itemPredicate={filterChoreoType}
                                itemRenderer={this.renderChoreoType}
                                items={this.state.choreographyTypes_items}
                                itemsEqual={areChoreoTypesEqual}
                                menuProps={{"aria-label": "Choregraphy Types" }}
                                noResults={<MenuItem2 disabled={true} text="No results." roleStructure='listoption' />}
                                onClear={this.handleChoreoTypesClear}
                                onItemSelect={this.handleChoreoTypeSelect}
                                placeholder='Select one or many' 
                                resetOnSelect={true}
                                selectedItems={this.state.choreoTypes_selectedItems} 
                                tagRenderer={this.renderChoreoTypeTag}      
                                tagInputProps={{
                                    onRemove: this.handleChoreoTypeTagRemove,
                                    tagProps: getTagProps
                                }}
                            />
                        </Label>
                        <Label>
                            Gem Speed
                            <MultiSlider>
                                <MultiSlider.Handle
                                    value={3}
                                    type='start'
                                    intentAfter={Intent.PRIMARY}
                                />
                                <MultiSlider.Handle
                                    value={8}
                                    type='end'
                                />
                            </MultiSlider>
                        </Label>
                        <Label>
                            Published
                            <DateRangeInput2
                                formatDate={(date, localeCode) => 
                                    format(date, DATE_FORMAT, maybeGetLocaleOptions(localeCode) )
                                }
                                closeOnSelection={false}
                                value={this.state.published_range}
                                onChange={this.updateDateRange}
                            />
                        </Label>
                    </SearchDetails>
                    <SearchButton 
                        text='Search' 
                        intent={Intent.PRIMARY}
                        onClick={this.search}
                    />
                </Collapse>
            </Container>
        )
    }

    private handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.search()
        }
    }

    private handleAdvancedSearchVisibleClick = () => {
        this.setState({ advancedSearchVisible: !this.state.advancedSearchVisible})
    }

    private updateDateRange = ( range: DateRange) =>
        this.setState( { published_range: range })

    private updateSearchText = (event: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState({ searchText: event.target.value})

    private search = async () : Promise<void> => {
        const { searchText } = this.state
        this.searchPromise = makeCancelablePromise (
            Context.songs.fetchSongs({
                searchText: searchText
            })
        )
    }

    //#region Search (ChoreographyType)

    private renderChoreoTypeTag = (choreographyType: ChoreographyType) => choreographyType.displayName

    private renderChoreoType: ItemRenderer<ChoreographyType> = (choreoType, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null
        }

        return (
            <MenuItem2
                {...getChoreoTypeItemProps(choreoType, props)}
                selected={this.isChoreoTypeSelected(choreoType)}
                shouldDismissPopover={false}
                text={`${choreoType.displayName}`}
            />
        )
    }

    private handleChoreoTypeTagRemove = (_tag: React.ReactNode, index: number) => {
        this.deselectChoreoTypes(index)
    }

    private getSelectedChoreoTypeIndex(choreoType: ChoreographyType) {
        return this.state.choreoTypes_selectedItems.indexOf(choreoType)
    }

    private isChoreoTypeSelected(choreoType: ChoreographyType) {
        return this.getSelectedChoreoTypeIndex(choreoType) !== 1
    }

    private selectChoreoType(choreoType: ChoreographyType) {
        this.selectChoreoTypes([choreoType])
    }

    private selectChoreoTypes(choreoTypesToSelect: ChoreographyType[]) {
        let nextSelectedChoreoTypes = this.state.choreoTypes_selectedItems.slice()
        choreoTypesToSelect.forEach(choreoType => {
            nextSelectedChoreoTypes = !arrayContainsChoreoType(nextSelectedChoreoTypes, choreoType) ? [...nextSelectedChoreoTypes, choreoType] : nextSelectedChoreoTypes          
        })
        this.setState({choreographytypes_selected: nextSelectedChoreoTypes})
    }

    private deselectChoreoTypes(index: number) {
        const { choreoTypes_selectedItems: choreoTypes_selectedItems } = this.state
        const choreoType = choreoTypes_selectedItems[index]

    }

    private handleChoreoTypeSelect = (choreoType: ChoreographyType) => {
        if (!this.isChoreoTypeSelected(choreoType)) {
            this.selectChoreoType(choreoType)
        } else {
            this.deselectChoreoTypes(this.getSelectedChoreoTypeIndex(choreoType))
        }
    }

    private handleChoreoTypesClear = () => {
        this.setState({ choreographyTypes_selectedItems: [] })
    }

//#endregion
}

const Container = styled.div`
    padding-bottom: 15px;
`

const SearchDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 0px 10px;
    width: 100%;
    margin-top: 20px;
`

const SearchButton = styled(Button)`
    width: 100%;
`

export default observer(SongSearch)