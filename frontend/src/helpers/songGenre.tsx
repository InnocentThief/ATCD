import { MenuItem2Props } from "@blueprintjs/popover2";
import { GenreDto } from "../models/GenreDto";
import { highlightText } from "./textHighlighter";
import { ItemPredicate, ItemRendererProps } from "@blueprintjs/select";

export function getItemProps(genre: GenreDto, { handleClick, handleFocus, modifiers, ref, query }: ItemRendererProps
): MenuItem2Props & React.Attributes {
    return {
        active: modifiers.active,
        disabled: modifiers.disabled,
        elementRef: ref,
        key: genre.genreKey,
        label: "",
        onClick: handleClick,
        onFocus: handleFocus,
        roleStructure: "listoption",
        text: highlightText(genre.displayName, query),
    };
}

export const filterGenre: ItemPredicate<GenreDto> = (query, genre, _index, exactMath) => {
    const normalizedTitle = genre.displayName.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMath) {
        return normalizedTitle === normalizedQuery;
    } else {
        return `${genre.displayName}`.indexOf(normalizedQuery) >= 0;
    }
};

export function areGenresEqual(genreA: GenreDto, genreB: GenreDto) {
    return (
        genreA.displayName.toLowerCase() === genreB.displayName.toLowerCase()
    );
}

export function doesGenreEqualQuery(genre: GenreDto, query: string) {
    return genre.displayName.toLowerCase() === query.toLowerCase();
}

export function arrayContainsGenre(genres: GenreDto[], genreToFind: GenreDto): boolean {
    return genres.some(
        (genre: GenreDto) => genre.displayName === genreToFind.displayName
    );
}