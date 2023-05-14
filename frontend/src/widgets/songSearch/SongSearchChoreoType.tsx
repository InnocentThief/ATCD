import { ControlGroup, Intent, TagProps } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, MultiSelect2 } from "@blueprintjs/select";
import { observer } from "mobx-react";
import React from "react";
import { arrayContainsChoreoType, ChoreographyType, areChoreoTypesEqual, filterChoreoType, getChoreoTypeItemProps } from "../../components/layouts/ChoreographyTypes";
import styled from "styled-components";
import { Context } from "../../contexts";

class SongSearchChoreoType extends React.Component {
    render() {
        const {
            songSearch: { choreographyTypes_items, choreoTypes_selectedItems },
            language: { get }
        } = Context;

        const getTagProps = (_value: React.ReactNode, index: number): TagProps => ({
            intent: Intent.NONE,
            minimal: false,
        });

        return (
            <AdvancedSearchControlGroup vertical={true} fill={true}>
                <AdvancedSearchLabel>{get("SongSearch.ChoreographyType.Label")}</AdvancedSearchLabel>
                <MultiSelect2<ChoreographyType>
                    itemPredicate={filterChoreoType}
                    itemRenderer={this.renderChoreoType}
                    items={choreographyTypes_items}
                    itemsEqual={areChoreoTypesEqual}
                    menuProps={{ "aria-label": "Choregraphy Types" }}
                    noResults={
                        <MenuItem2
                            disabled={true}
                            text="No results."
                            roleStructure="listoption"
                        />
                    }
                    onClear={this.handleChoreoTypesClear}
                    onItemSelect={this.handleChoreoTypeSelect}
                    placeholder={get("SongSearch.ChoreographyType.Placeholder")}
                    resetOnSelect={true}
                    selectedItems={choreoTypes_selectedItems}
                    tagRenderer={this.renderChoreoTypeTag}
                    tagInputProps={{
                        onRemove: this.handleChoreoTypeTagRemove,
                        tagProps: getTagProps,
                    }}
                />
            </AdvancedSearchControlGroup>
        )
    }

    private renderChoreoTypeTag = (choreographyType: ChoreographyType) =>
        choreographyType.displayName;

    private renderChoreoType: ItemRenderer<ChoreographyType> = (
        choreoType,
        props
    ) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem2
                {...getChoreoTypeItemProps(choreoType, props)}
                selected={this.isChoreoTypeSelected(choreoType)}
                shouldDismissPopover={false}
                text={`${choreoType.displayName}`}
            />
        );
    };

    private handleChoreoTypeTagRemove = (
        _tag: React.ReactNode,
        index: number
    ) => {
        this.deselectChoreoTypes(index);
    };

    private getSelectedChoreoTypeIndex(choreoType: ChoreographyType) {
        const {
            songSearch: { choreoTypes_selectedItems }
        } = Context
        return choreoTypes_selectedItems.indexOf(choreoType);
    }

    private isChoreoTypeSelected(choreoType: ChoreographyType) {
        return this.getSelectedChoreoTypeIndex(choreoType) !== 1;
    }

    private selectChoreoType(choreoType: ChoreographyType) {
        this.selectChoreoTypes([choreoType]);
    }

    private selectChoreoTypes(choreoTypesToSelect: ChoreographyType[]) {
        const {
            songSearch: { choreoTypes_selectedItems }
        } = Context
        let nextSelectedChoreoTypes = choreoTypes_selectedItems.slice();
        choreoTypesToSelect.forEach((choreoType) => {
            nextSelectedChoreoTypes = !arrayContainsChoreoType(
                nextSelectedChoreoTypes,
                choreoType
            )
                ? [...nextSelectedChoreoTypes, choreoType]
                : nextSelectedChoreoTypes;
        });
        this.setState({ choreographytypes_selected: nextSelectedChoreoTypes });
    }

    private deselectChoreoTypes(index: number) {
        const {
            songSearch: { choreoTypes_selectedItems }
        } = Context
        const choreoType = choreoTypes_selectedItems[index];
    }

    private handleChoreoTypeSelect = (choreoType: ChoreographyType) => {
        if (!this.isChoreoTypeSelected(choreoType)) {
            this.selectChoreoType(choreoType);
        } else {
            this.deselectChoreoTypes(this.getSelectedChoreoTypeIndex(choreoType));
        }
    };

    private handleChoreoTypesClear = () => {
        this.setState({ choreographyTypes_selectedItems: [] });
    };
}

const AdvancedSearchLabel = styled.div`
    margin-bottom: 6px;
`

const AdvancedSearchControlGroup = styled(ControlGroup)`
    margin-bottom: 10px;
`

export default observer(SongSearchChoreoType)