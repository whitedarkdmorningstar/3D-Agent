import { Variant } from "@/constants/theme/variables";
import useTheme from "@/hooks/use-theme";
import React from "react";
import { Text } from "react-native";

export interface LegendProps extends React.ComponentProps<typeof Text> {
  variant?: Variant;
}

export default function Legend({ variant, ...props }: LegendProps) {
  const { colors, fontSize, spacing } = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          textAlign: "center",
          paddingVertical: spacing.lg,
          color: variant ? colors[variant] : colors.text,
          fontSize: fontSize.title,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
}
