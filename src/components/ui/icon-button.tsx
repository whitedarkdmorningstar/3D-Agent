import { Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface IconButtonProps extends TouchableOpacityProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: React.ComponentProps<typeof Ionicons>["color"];
  size?: React.ComponentProps<typeof Ionicons>["size"];
  variant?: Variant;
  shape?: "circle" | "rounded" | "square";
}

export default function IconButton({
  color,
  size = 24,
  name,
  variant,
  shape = "circle",
  ...rest
}: IconButtonProps) {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      {...rest}
      style={[
        {
          padding: spacing.md,
          backgroundColor: colors.backdrop,
          borderRadius:
            shape === "circle" ? 100 : shape === "rounded" ? borderRadius : 0,
        },
        rest.style,
      ]}
    >
      <Ionicons
        name={name}
        size={size}
        color={variant ? colors[variant] : colors.text}
      />
    </TouchableOpacity>
  );
}
