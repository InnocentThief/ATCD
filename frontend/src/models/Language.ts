import { deTextRepo } from "../languages/de";
import { enTextRepo } from "../languages/en";
import { TextRepo } from "./TextRepo";

export const LanguageMapping = {
  de: "Deutsch",
  en: "English",
};

export type Language = keyof typeof LanguageMapping;

export const AllLanguages = Object.keys(LanguageMapping) as Language[];

export const getTextRepo = (language: Language): TextRepo => {
  switch (language) {
    case "en":
      return enTextRepo;
    case "de":
      return deTextRepo;
    default:
      return enTextRepo;
  }
};
