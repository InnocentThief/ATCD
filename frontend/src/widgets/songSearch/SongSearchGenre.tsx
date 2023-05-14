import { ControlGroup } from "@blueprintjs/core";
import { ItemRendererProps, MultiSelect2 } from "@blueprintjs/select";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { Context } from "../../contexts";

class SongSearchGenre extends React.Component {
  render() {
    const {
      language: { get }
    } = Context
    return (
      <AdvancedSearchControlGroup vertical={true} fill={true}>
        <AdvancedSearchLabel>{get("SongSearch.Genre.Label")}</AdvancedSearchLabel>
        <MultiSelect2
          placeholder={get("SongSearch.Genre.Placeholder")}
          selectedItems={[]}
          tagRenderer={function (item: unknown): React.ReactNode {
            throw new Error("Function not implemented.");
          }}
          items={[]}
          itemRenderer={function (
            item: unknown,
            itemProps: ItemRendererProps<HTMLLIElement>
          ): JSX.Element | null {
            throw new Error("Function not implemented.");
          }}
          onItemSelect={function (
            item: unknown,
            event?: React.SyntheticEvent<HTMLElement, Event> | undefined
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
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

export default observer(SongSearchGenre)