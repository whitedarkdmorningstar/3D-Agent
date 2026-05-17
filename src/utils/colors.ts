import { ExtendedMD3Colors, Variant } from "@/constants/theme/types";

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
