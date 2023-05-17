import { MenuItem2Props } from "@blueprintjs/popover2"
import { ItemPredicate, ItemRendererProps } from "@blueprintjs/select"
import { highlightText } from "./textHighlighter"

export interface ChoreographyExclude {
    id: number
    displayName: string
}

export const CHOREOGRAPHY_EXCLUDES: ChoreographyExclude[] = [
    { id: 1, displayName: "Explicit" },
    { id: 2, displayName: "Challenge" },
    { id: 3, displayName: "Content Strike" }
].map((f, index) => ({ ...f, id: index + 1 }))

export function getItemProps(choreographyExclude: ChoreographyExclude, { handleClick, handleFocus, modifiers, ref, query }: ItemRendererProps
): MenuItem2Props & React.Attributes {
    return {
        active: modifiers.active,
        disabled: modifiers.disabled,
        elementRef: ref,
        key: choreographyExclude.id,
        label: "",
        onClick: handleClick,
        onFocus: handleFocus,
        roleStructure: "listoption",
        text: highlightText(choreographyExclude.displayName, query),
    };
}

export const filterChoreoExclude: ItemPredicate<ChoreographyExclude> = (query, choreographyType, _index, exactMath) => {
    const normalizedTitle = choreographyType.displayName.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMath) {
        return normalizedTitle === normalizedQuery;
    } else {
        return `${choreographyType.displayName}`.indexOf(normalizedQuery) >= 0;
    }
};

export function areChoreoExcludesEqual(choreoExcludeA: ChoreographyExclude, choreoExcludeB: ChoreographyExclude) {
    return (
        choreoExcludeA.displayName.toLowerCase() === choreoExcludeB.displayName.toLowerCase()
    );
}

export function doesChoreTypeEqualQuery(choreoExclude: ChoreographyExclude, query: string) {
    return choreoExclude.displayName.toLowerCase() === query.toLowerCase();
}

export function arrayContainsChoreoExclude(choreographyExcludes: ChoreographyExclude[], excludeToFind: ChoreographyExclude): boolean {
    return choreographyExcludes.some(
        (choreographyExclude: ChoreographyExclude) => choreographyExclude.displayName === excludeToFind.displayName
    );
}