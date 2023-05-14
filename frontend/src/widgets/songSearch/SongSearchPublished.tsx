import { ControlGroup } from "@blueprintjs/core";
import React from "react";
import { Context } from "../../contexts";
import { observer } from "mobx-react";
import { DateFnsDateRange } from "../DateFnsDateRange";
import { DateRangeInput2 } from "@blueprintjs/datetime2";
import { format, parse } from "date-fns";
import styled from "styled-components";
import { DateRange } from "@blueprintjs/datetime";

class SongSearchPublished extends React.Component {
    render() {
        const {
            songSearch: { published_range },
            language: { get }
        } = Context

        const locales: {
            [localeCode: string]: Locale;
        } = require("date-fns/locale");

        const FORMAT = "yyyy-MM-dd";

        function maybeGetLocaleOptions(
            localeCode: string | undefined
        ): { locale: Locale } | undefined {
            if (localeCode == null || locales[localeCode] == null) return undefined;
            return { locale: locales[localeCode] };
        }

        return (
            <AdvancedSearchControlGroup vertical={true} fill={true}>
                <AdvancedSearchLabel>{get("SongSearch.Published.Label")}</AdvancedSearchLabel>
                <DateRangeInput2
                    fill={true}
                    formatDate={(date, localeCode) =>
                        format(date, FORMAT, maybeGetLocaleOptions(localeCode))
                    }
                    parseDate={(str, localeCode) =>
                        parse(str, FORMAT, new Date(), maybeGetLocaleOptions(localeCode))
                    }
                    highlightCurrentDay={true}
                    value={published_range}
                    onChange={this.handleRangeChange}
                    timePickerProps={undefined}
                />
                <DateFnsDateRange range={published_range} />
            </AdvancedSearchControlGroup>
        )
    }

    private handleRangeChange = (range: DateRange) => {
        const {
            songSearch: { updatePublishedRanged }
        } = Context
        updatePublishedRanged(range)
    }
}

const AdvancedSearchLabel = styled.div`
    margin-bottom: 6px;
`

const AdvancedSearchControlGroup = styled(ControlGroup)`
    margin-bottom: 10px;
`

export default observer(SongSearchPublished);