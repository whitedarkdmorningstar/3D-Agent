import { ICON_SIZE } from "@/constants/settings";
import { Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

interface IconProps extends React.ComponentProps<
  typeof MaterialCommunityIcons
> {
  variant?: Variant;
}

export default function Icon({ variant, ...props }: IconProps) {
  const { colors } = useTheme();

  return (
    <MaterialCommunityIcons
      size={ICON_SIZE}
      color={variant ? colors[variant as Variant] : colors.text}
      {...props}
    />
  );
}
