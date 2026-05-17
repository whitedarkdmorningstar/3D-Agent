import { ExtendedMD3Colors, Variant } from "@/constants/theme/types";

export function getVariantColor(colors: ExtendedMD3Colors, variant: Variant) {
  return colors[variant];
}

export function getOnVariantColor(colors: ExtendedMD3Colors, variant: Variant) {
  return variant === "primary"
    ? colors.onPrimary
    : variant === "secondary"
      ? colors.onSecondary
      : variant === "tertiary"
        ? colors.onTertiary
        : variant === "success"
          ? colors.onSuccess
          : variant === "warning"
            ? colors.onWarning
            : variant === "error"
              ? colors.onError
              : undefined;
}

export function getOnVariantContainerColor(
  colors: ExtendedMD3Colors,
  variant: Variant,
) {
  return variant === "primary"
    ? colors.onPrimaryContainer
    : variant === "secondary"
      ? colors.onSecondaryContainer
      : variant === "tertiary"
        ? colors.onTertiaryContainer
        : variant === "success"
          ? colors.onSuccessContainer
          : variant === "warning"
            ? colors.onWarningContainer
            : variant === "error"
              ? colors.onErrorContainer
              : undefined;
}

export function getVariantContainerColor(
  colors: ExtendedMD3Colors,
  variant: Variant,
) {
  return variant === "primary"
    ? colors.primaryContainer
    : variant === "secondary"
      ? colors.secondaryContainer
      : variant === "tertiary"
        ? colors.tertiaryContainer
        : variant === "success"
          ? colors.successContainer
          : variant === "warning"
            ? colors.warningContainer
            : variant === "error"
              ? colors.errorContainer
              : undefined;
}
