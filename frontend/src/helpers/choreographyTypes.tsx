import { MenuItem2Props } from "@blueprintjs/popover2";
import { ItemPredicate, ItemRendererProps } from "@blueprintjs/select";
import { highlightText } from "./textHighlighter";

export interface ChoreographyType {
  id: number;
  displayName: string;
}

export const CHOREOGRAPHY_TYPES: ChoreographyType[] = [
  { id: 1, displayName: "Easy" },
  { id: 2, displayName: "Regular" },
  { id: 3, displayName: "Expert" },
  { id: 4, displayName: "Cardio" },
].map((f, index) => ({ ...f, id: index + 1 }));

export function getItemProps(choreographyType: ChoreographyType, { handleClick, handleFocus, modifiers, ref, query }: ItemRendererProps
): MenuItem2Props & React.Attributes {
  return {
    active: modifiers.active,
    disabled: modifiers.disabled,
    elementRef: ref,
    key: choreographyType.id,
    label: "",
    onClick: handleClick,
    onFocus: handleFocus,
    roleStructure: "listoption",
    text: highlightText(choreographyType.displayName, query),
  };
}

export const filterChoreoType: ItemPredicate<ChoreographyType> = (query, choreographyType, _index, exactMath) => {
  const normalizedTitle = choreographyType.displayName.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMath) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${choreographyType.displayName}`.indexOf(normalizedQuery) >= 0;
  }
};

export function areChoreoTypesEqual(choreoTypeA: ChoreographyType, choreoTypeB: ChoreographyType) {
  return (
    choreoTypeA.displayName.toLowerCase() === choreoTypeB.displayName.toLowerCase()
  );
}

export function doesChoreTypeEqualQuery(choreoType: ChoreographyType, query: string) {
  return choreoType.displayName.toLowerCase() === query.toLowerCase();
}

export function arrayContainsChoreoType(choreographyTypes: ChoreographyType[], choreographyToFind: ChoreographyType): boolean {
  return choreographyTypes.some(
    (choreographyType: ChoreographyType) => choreographyType.displayName === choreographyToFind.displayName
  );
}
