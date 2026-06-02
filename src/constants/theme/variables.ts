export const VARIANTS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

export type Variant = (typeof VARIANTS)[number];

export const SPACING = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
  xxl: 64,
} as const;

export type Spacing = keyof typeof SPACING;

export const FONTSIZE = {
  default: 16,
  heading: 28,
  subheading: 24,
  title: 18,
  subtitle: 16,
  label: 14,
} as const;

export type Size = keyof typeof SPACING;

export type FontSize = keyof typeof FONTSIZE;

export type FontSizeKey = keyof typeof FONTSIZE;
