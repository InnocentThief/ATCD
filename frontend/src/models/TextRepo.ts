import { TextKey } from "./TextKey";

export type TextRepo = {
  [key in TextKey]: string;
};
