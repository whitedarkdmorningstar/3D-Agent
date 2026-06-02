export * from "./colors";
export * from "./tw-colors";
export * from "./variables";

import { DarkTheme, DefaultTheme as LightTheme } from "expo-router";
import { COLORS } from "./colors";
import { FONTSIZE, SPACING } from "./variables";

const others = {
  spacing: SPACING,
  fontSize: FONTSIZE,
  borderRadius: 16,
  borderWidth: 1,
};

export const THEME = {
  LIGHT: {
    ...LightTheme,
    colors: COLORS.LIGHT,
    ...others,
  },
  DARK: { ...DarkTheme, colors: COLORS.DARK, ...others },
} as const;

export type Theme = typeof THEME.LIGHT;
