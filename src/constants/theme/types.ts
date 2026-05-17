import {
  MD3Colors,
  MD3Theme,
  MD3Type,
  MD3Typescale,
} from "react-native-paper/src/types";
import { LIGHT_THEME, VARIANTS } from ".";

export type Variant = (typeof VARIANTS)[number];

export interface ExtendedMD3Colors extends MD3Colors {
  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;
  warning: string;
  onWarning: string;
  warningContainer: string;
  onWarningContainer: string;
}

export interface Fonts extends Omit<MD3Typescale, "default"> {
  default: MD3Type;
}

export interface ExtendedMD3Theme extends MD3Theme {
  colors: ExtendedMD3Colors;
}

export type CombinedTheme = typeof LIGHT_THEME;
