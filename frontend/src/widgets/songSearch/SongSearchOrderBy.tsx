import { ControlGroup } from "@blueprintjs/core";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

export interface SongSearchOrderType {
    type: number;
    displayName: string;
}

export const SONG_SEARCH_ORDER_TYPES: SongSearchOrderType[] = [
    { type: 0, displayName: "Published ascending" },
    { type: 1, displayName: "Published descending" },
    { type: 2, displayName: "Song name ascending" },
    { type: 3, displayName: "Song name descending" },
    { type: 4, displayName: "Artist ascending" },
    { type: 5, displayName: "Artist descending" },
    { type: 6, displayName: "Mapper ascending" },
    { type: 7, displayName: "Mapper descending" }
]

class SongSearchOrderBy extends React.Component {

    render() {
        return (
            <SortByControlGroup>
                
            </SortByControlGroup>
        )
    }
}

const SortByControlGroup = styled(ControlGroup)`
    margin-top: 15px;
    margin-bottom: 15px;
`

export default observer(SongSearchOrderBy)