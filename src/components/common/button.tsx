import { Variant } from "@/constants/theme/types";
import useTheme from "@/hooks/use-theme";
import { getOnVariantColor } from "@/utils/colors";
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
    () => getOnVariantColor(colors, variant),
    [colors, variant],
  );

  return (
    <PaperButton
      buttonColor={mode === "contained" ? variantColor : undefined}
      textColor={mode === "contained" ? textColor : undefined}
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
