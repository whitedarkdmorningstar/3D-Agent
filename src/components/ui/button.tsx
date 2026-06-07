import { ICON_SIZE } from "@/constants/settings";
import { TW_COLORS, Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  variant?: Variant;
  mode?: "outline" | "contained";
  loading?: boolean;
  reverse?: boolean;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: React.ComponentProps<typeof MaterialCommunityIcons>["size"];
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  variant = "primary",
  mode = "contained",
  loading,
  reverse,
  style,
  ...props
}: ButtonProps) {
  const { colors, borderRadius, borderWidth, fontSize, spacing } = useTheme();

  const btnStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor:
        props.disabled || loading
          ? colors.disabled
          : mode === "contained"
            ? colors[variant]
            : "transparent",
      padding: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius,
      borderWidth: mode === "outline" ? borderWidth : 0,
      borderColor: mode === "outline" ? colors[variant] : colors.border,
      flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      minWidth: 100,
    }),
    [
      colors,
      variant,
      spacing,
      borderWidth,
      borderRadius,
      loading,
      props.disabled,
      reverse,
    ],
  );

  const textColor = useMemo(
    () => (mode === "outline" ? colors[variant] : TW_COLORS.gray["50"]),
    [mode, colors, variant],
  );

  const textStyle: TextStyle = useMemo(
    () => ({
      color: textColor,
      fontSize: fontSize.default,
    }),
    [textColor, fontSize],
  );

  return (
    <TouchableOpacity activeOpacity={0.88} {...props} style={[btnStyle, style]}>
      <>
        {loading ? (
          <ActivityIndicator animating color={textColor} />
        ) : (
          props.icon && (
            <MaterialCommunityIcons
              name={props.icon}
              size={props.size || ICON_SIZE}
              color={
                mode === "outline" ? colors[variant] : TW_COLORS.gray["50"]
              }
            />
          )
        )}
        <Text style={[textStyle, props.textStyle]}>{props.children}</Text>
      </>
    </TouchableOpacity>
  );
}
