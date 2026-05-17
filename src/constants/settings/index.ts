import { generateCurrentWeek } from "../invoice/week";
import { Language, Settings, ThemeMode } from "./schema";

export const THEME_MODE: { [key: string]: ThemeMode } = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const LANGUAGE: { [key: string]: Language } = {
  ENGLISH: "english",
  MYANAMR: "myanmar",
};

export const DEFAULT_SETTINGS: Settings = {
  mode: THEME_MODE.SYSTEM,
  language: LANGUAGE.ENGLISH,
  limit: 5,
  year: new Date().getFullYear(),
  week: generateCurrentWeek() || 0,
};
