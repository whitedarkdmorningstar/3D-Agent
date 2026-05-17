import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import { adaptNavigationTheme } from "react-native-paper";
import { MD3Typescale } from "react-native-paper/lib/typescript/types";
import { ExtendedMD3Colors, ExtendedMD3Theme, Fonts } from "./types";
import { getMD3Object } from "./utils";

export const VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "error",
] as const;

const LIGHT_COLORS: ExtendedMD3Colors = {
  primary: "rgb(28, 75, 234)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(221, 225, 255)",
  onPrimaryContainer: "rgb(0, 19, 86)",
  secondary: "rgb(90, 93, 114)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(223, 225, 249)",
  onSecondaryContainer: "rgb(23, 27, 44)",
  tertiary: "rgb(104, 71, 192)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(232, 221, 255)",
  onTertiaryContainer: "rgb(33, 0, 93)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  success: "rgb(16, 109, 32)",
  onSuccess: "rgb(255, 255, 255)",
  successContainer: "rgb(157, 248, 152)",
  onSuccessContainer: "rgb(0, 34, 4)",
  warning: "rgb(228, 212, 37)",
  onWarning: "rgb(255, 255, 255)",
  warningContainer: "rgb(234, 234, 45)",
  onWarningContainer: "rgb(29, 29, 0)",
  background: "rgb(254, 251, 255)",
  onBackground: "rgb(27, 27, 31)",
  surface: "rgb(254, 251, 255)",
  onSurface: "rgb(27, 27, 31)",
  surfaceVariant: "rgb(226, 225, 236)",
  onSurfaceVariant: "rgb(69, 70, 79)",
  outline: "rgb(118, 118, 128)",
  outlineVariant: "rgb(198, 197, 208)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(48, 48, 52)",
  inverseOnSurface: "rgb(243, 240, 244)",
  inversePrimary: "rgb(185, 195, 255)",
  elevation: {
    level0: "transparent",
    level1: "rgb(243, 242, 254)",
    level2: "rgb(236, 237, 253)",
    level3: "rgb(229, 232, 253)",
    level4: "rgb(227, 230, 253)",
    level5: "rgb(222, 226, 252)",
  },
  surfaceDisabled: "rgba(27, 27, 31, 0.12)",
  onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
  backdrop: "rgba(47, 48, 56, 0.4)",
};

const DARK_COLORS: ExtendedMD3Colors = {
  primary: "rgb(185, 195, 255)",
  onPrimary: "rgb(0, 35, 136)",
  primaryContainer: "rgb(0, 53, 190)",
  onPrimaryContainer: "rgb(221, 225, 255)",
  secondary: "rgb(195, 197, 221)",
  onSecondary: "rgb(44, 47, 66)",
  secondaryContainer: "rgb(66, 70, 89)",
  onSecondaryContainer: "rgb(223, 225, 249)",
  tertiary: "rgb(206, 189, 255)",
  onTertiary: "rgb(57, 5, 144)",
  tertiaryContainer: "rgb(80, 43, 167)",
  onTertiaryContainer: "rgb(232, 221, 255)",
  error: "rgb(255, 180, 171)",
  onError: "rgb(105, 0, 5)",
  errorContainer: "rgb(147, 0, 10)",
  onErrorContainer: "rgb(255, 180, 171)",
  success: "rgb(130, 219, 126)",
  onSuccess: "rgb(0, 57, 10)",
  successContainer: "rgb(0, 83, 18)",
  onSuccessContainer: "rgb(157, 248, 152)",
  warning: "rgb(223, 219, 0)",
  onWarning: "rgb(50, 50, 0)",
  warningContainer: "rgb(73, 73, 0)",
  onWarningContainer: "rgb(234, 234, 45)",
  background: "rgb(27, 27, 31)",
  onBackground: "rgb(228, 225, 230)",
  surface: "rgb(27, 27, 31)",
  onSurface: "rgb(228, 225, 230)",
  surfaceVariant: "rgb(69, 70, 79)",
  onSurfaceVariant: "rgb(198, 197, 208)",
  outline: "rgb(144, 144, 154)",
  outlineVariant: "rgb(69, 70, 79)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(228, 225, 230)",
  inverseOnSurface: "rgb(48, 48, 52)",
  inversePrimary: "rgb(28, 75, 234)",
  elevation: {
    level0: "transparent",
    level1: "rgb(35, 35, 42)",
    level2: "rgb(40, 40, 49)",
    level3: "rgb(44, 46, 56)",
    level4: "rgb(46, 47, 58)",
    level5: "rgb(49, 51, 62)",
  },
  surfaceDisabled: "rgba(228, 225, 230, 0.12)",
  onSurfaceDisabled: "rgba(228, 225, 230, 0.38)",
  backdrop: "rgba(47, 48, 56, 0.4)",
};

export const FONTS: Fonts = {
  default: getMD3Object(16),
  displayLarge: getMD3Object(57),
  displayMedium: getMD3Object(45),
  displaySmall: getMD3Object(36),
  headlineLarge: getMD3Object(32),
  headlineMedium: getMD3Object(28),
  headlineSmall: getMD3Object(24),
  titleLarge: getMD3Object(22),
  titleMedium: getMD3Object(16),
  titleSmall: getMD3Object(14),
  bodyLarge: getMD3Object(16),
  bodyMedium: getMD3Object(16),
  bodySmall: getMD3Object(12),
  labelLarge: getMD3Object(16),
  labelMedium: getMD3Object(14),
  labelSmall: getMD3Object(12),
};

const ANIMATION = { scale: 0.7 };

const MD3_LIGHT_THEME: ExtendedMD3Theme = {
  animation: ANIMATION,
  colors: LIGHT_COLORS,
  dark: false,
  roundness: 4,
  fonts: FONTS as MD3Typescale,
  version: 3,
  isV3: true,
};

const MD3_DARK_THEME: ExtendedMD3Theme = {
  ...MD3_LIGHT_THEME,
  dark: true,
  colors: DARK_COLORS,
};

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  materialLight: MD3_LIGHT_THEME,
});

const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  materialDark: MD3_DARK_THEME,
});

export const LIGHT_THEME = {
  ...LightTheme,
  ...MD3_LIGHT_THEME,
  colors: { ...LightTheme.colors, ...MD3_LIGHT_THEME.colors },
  fonts: { ...NavigationLightTheme.fonts, ...FONTS },
};

export const DARK_THEME = {
  ...DarkTheme,
  ...MD3_DARK_THEME,
  colors: { ...DarkTheme.colors, ...MD3_DARK_THEME.colors },
  fonts: { ...NavigationDarkTheme.fonts, ...FONTS },
};
