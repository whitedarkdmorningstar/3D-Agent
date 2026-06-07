import { ICON_SIZE } from "@/constants/settings";
import { Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableHighlight, TouchableHighlightProps } from "react-native";

export interface IconButtonProps extends TouchableHighlightProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color?: React.ComponentProps<typeof MaterialCommunityIcons>["color"];
  backgroundColor?: string;
  size?: React.ComponentProps<typeof MaterialCommunityIcons>["size"];
  variant?: Variant;
  shape?: "circle" | "rounded" | "square";
  fab?: boolean;
}

export default function IconButton({
  color,
  backgroundColor,
  size = ICON_SIZE,
  name,
  variant,
  shape = "circle",
  fab,
  ...rest
}: IconButtonProps) {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <TouchableHighlight
      underlayColor={colors.border}
      {...rest}
      style={[
        {
          padding: fab ? spacing.lg : spacing.md,
          backgroundColor: backgroundColor
            ? backgroundColor
            : fab
              ? colors.backdrop
              : "transparent",
          borderRadius:
            shape === "circle" ? 100 : shape === "rounded" ? borderRadius : 0,
          elevation: fab ? 4 : 0,
          opacity: rest.disabled ? 0.88 : 1,
          alignItems: "center",
          justifyContent: "center",
          borderColor: rest.disabled
            ? colors.disabled
            : variant
              ? colors[variant]
              : colors.border,
        },
        rest.style,
      ]}
    >
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={
          rest.disabled
            ? colors.disabled
            : variant
              ? colors[variant]
              : colors.text
        }
      />
    </TouchableHighlight>
  );
}
