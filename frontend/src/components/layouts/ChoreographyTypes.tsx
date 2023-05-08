import { MenuItem2Props } from "@blueprintjs/popover2";
import { ItemPredicate, ItemRendererProps } from "@blueprintjs/select";

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

export function getChoreoTypeItemProps(
  choreographyType: ChoreographyType,
  { handleClick, handleFocus, modifiers, ref, query }: ItemRendererProps
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
    text: highlightText(`${choreographyType.displayName}`, query),
  };
}

export const filterChoreoType: ItemPredicate<ChoreographyType> = (
  query,
  choreographyType,
  _index,
  exactMath
) => {
  const normalizedTitle = choreographyType.displayName.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMath) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${choreographyType.displayName}`.indexOf(normalizedQuery) >= 0;
  }
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function areChoreoTypesEqual(
  choreoTypeA: ChoreographyType,
  choreoTypeB: ChoreographyType
) {
  return (
    choreoTypeA.displayName.toLowerCase() ===
    choreoTypeB.displayName.toLowerCase()
  );
}

export function doesChoreTypeEqualQuery(
  choreoType: ChoreographyType,
  query: string
) {
  return choreoType.displayName.toLowerCase() === query.toLowerCase();
}

export function arrayContainsChoreoType(
  choreographyTypes: ChoreographyType[],
  choreographyToFind: ChoreographyType
): boolean {
  return choreographyTypes.some(
    (choreographyType: ChoreographyType) =>
      choreographyType.displayName === choreographyToFind.displayName
  );
}
