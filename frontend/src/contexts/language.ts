import { makeAutoObservable } from "mobx";
import { AllLanguages, Language, getTextRepo } from "../models/Language";
import { TextKey } from "../models/TextKey";

const LANGUAGE_STORAGE_KEY = "selected-lang";

export class LanguageContext {
  availableLanguages: Language[] = ["en", "de"];
  language: Language = getDefault();

  constructor() {
    makeAutoObservable(this);
  }

  get = (key: TextKey): string => getTextRepo(this.language)[key] ?? `<${key}>`;

  set = (language: Language): void => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    this.language = language;
  };

  isActive = (language: Language): boolean => this.language === language;
}

const getDefault = () => {
  const storageLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  let language: Language | undefined;

  if (storageLanguage)
    language = AllLanguages.find(
      (availableLanguage) => storageLanguage === availableLanguage
    );

  if (!storageLanguage)
    language = AllLanguages.find((availableLanguage) =>
      navigator.language.startsWith(availableLanguage)
    );

  return language ?? "en";
};
