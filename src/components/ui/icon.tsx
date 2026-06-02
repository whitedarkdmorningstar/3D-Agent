import { Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface IconProps extends React.ComponentProps<typeof Ionicons> {
  variant?: Variant;
}

export default function Icon({ variant, ...props }: IconProps) {
  const { colors } = useTheme();

  return (
    <Ionicons
      size={24}
      color={variant ? colors[variant as Variant] : colors.text}
      {...props}
    />
  );
}
