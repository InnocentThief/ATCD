import { Button, Colors, MenuItem } from "@blueprintjs/core";
import { IItemRendererProps, Select } from "@blueprintjs/select";
import { observer } from "mobx-react";
import { Context } from "../contexts";
import { Language, LanguageMapping } from "../models/Language";
import styled from "styled-components";

export const LanguageSelection = observer(() => {
  const { availableLanguages, language, set } = Context.language;

  return (
    <LanguageSelect
      items={availableLanguages}
      onItemSelect={set}
      itemRenderer={languageItemRenderer}
      filterable={false}
    >
      <LanguageButton minimal small text={language} icon="globe" />
    </LanguageSelect>
  );
});

const LanguageButton = styled(Button)`
  && {
    color: ${Colors.GRAY1};
  }
`;

const languageItemRenderer = (
  language: Language,
  { handleClick }: IItemRendererProps
): JSX.Element => (
  <MenuItem
    key={language}
    text={`${LanguageMapping[language] ?? "--"} (${language})`}
    onClick={handleClick}
    active={Context.language.isActive(language)}
  />
);

const LanguageSelect = Select.ofType<Language>();
