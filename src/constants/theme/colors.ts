import { TW_COLORS } from "./tw-colors";

const LIGHT_COLORS = {
  primary: TW_COLORS.blue["600"],
  onPrimary: TW_COLORS.blue["50"],
  secondary: TW_COLORS.indigo["600"],
  onSecondary: TW_COLORS.indigo["50"],
  error: TW_COLORS.red["600"],
  onError: TW_COLORS.red["50"],
  warning: TW_COLORS.yellow["400"],
  onWarning: TW_COLORS.yellow["950"],
  info: TW_COLORS.sky["600"],
  onInfo: TW_COLORS.sky["50"],
  success: TW_COLORS.green["600"],
  onSuccess: TW_COLORS.green["50"],
  disabled: TW_COLORS.gray["400"],
  backdrop: TW_COLORS.gray["200"],
  // For Navigation Theme
  // Primary is already included
  background: TW_COLORS.slate["50"],
  card: TW_COLORS.slate["100"],
  text: TW_COLORS.gray["900"],
  border: TW_COLORS.gray["300"],
  notification: TW_COLORS.red["600"],
} as const;

const DARK_THEME = {
  primary: TW_COLORS.blue["700"],
  onPrimary: TW_COLORS.blue["50"],
  secondary: TW_COLORS.indigo["800"],
  onSecondary: TW_COLORS.indigo["50"],
  error: TW_COLORS.red["800"],
  onError: TW_COLORS.red["50"],
  warning: TW_COLORS.yellow["400"],
  onWarning: TW_COLORS.yellow["950"],
  info: TW_COLORS.sky["800"],
  onInfo: TW_COLORS.sky["50"],
  success: TW_COLORS.green["800"],
  onSuccess: TW_COLORS.green["50"],
  disabled: TW_COLORS.gray["400"],
  backdrop: TW_COLORS.gray["800"],
  // For Navigation Theme
  // Primary is already included
  background: TW_COLORS.slate["950"],
  card: TW_COLORS.slate["900"],
  text: TW_COLORS.gray["100"],
  border: TW_COLORS.gray["700"],
  notification: TW_COLORS.red["800"],
} as const;

export const COLORS = { LIGHT: LIGHT_COLORS, DARK: DARK_THEME };

export type Colors = typeof LIGHT_COLORS;
