import { Variant } from "@/constants/theme/types";
import useTheme from "@/hooks/use-theme";
import { getOnVariantColor, getOnVariantContainerColor } from "@/utils/colors";
import React, { useMemo } from "react";
import { Button as PaperButton } from "react-native-paper";

interface ButtonProps extends React.ComponentProps<typeof PaperButton> {
  variant?: Variant;
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  const { colors } = useTheme();
  const mode = props.mode || "contained";

  const variantColor = useMemo(() => colors[variant], [colors, variant]);
  const textColor = useMemo(
    () =>
      mode === "contained"
        ? getOnVariantColor(colors, variant)
        : mode === "outlined"
          ? getOnVariantContainerColor(colors, variant)
          : undefined,
    [colors, variant, mode, variantColor],
  );

  return (
    <PaperButton
      buttonColor={mode === "contained" ? variantColor : undefined}
      textColor={textColor}
      {...props}
      style={[
        {
          borderColor: mode === "outlined" ? variantColor : undefined,
        },
        props.style,
      ]}
    />
  );
}
