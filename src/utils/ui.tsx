import { Colors, Size, Spacing, Variant } from "@/constants/theme";

export function getOnVariantColor(variant: Variant, colors: Colors): string {
  return variant === "primary"
    ? colors.onPrimary
    : variant === "error"
      ? colors.onError
      : variant === "warning"
        ? colors.onWarning
        : variant === "info"
          ? colors.onInfo
          : variant === "success"
            ? colors.onSuccess
            : colors.onSecondary;
}

export function getSpacing(size: Size, spacing: Spacing) {
  return 
}