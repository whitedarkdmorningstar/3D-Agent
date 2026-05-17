import { Variant } from "@/constants/theme/types";
import useTheme from "@/hooks/use-theme";
import {
  getOnVariantContainerColor,
  getVariantColor,
  getVariantContainerColor,
} from "@/utils/colors";
import { ReactNode, useMemo } from "react";
import { StyleProp, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import { Icon, Text } from "react-native-paper";

interface AlertProps extends Omit<ViewProps, "children"> {
  variant?: Variant;
  children?: string | ReactNode;
  textStyle?: StyleProp<TextStyle>;
  source?: string;
  hideIcon?: boolean;
}

export default function Alert({
  variant = "error",
  children,
  hideIcon = false,
  ...props
}: AlertProps) {
  const { colors, roundness } = useTheme();
  const alertStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      backgroundColor: getVariantContainerColor(colors, variant),
      borderColor: getVariantColor(colors, variant),
      borderWidth: 1,
      borderRadius: roundness,
      padding: 16,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
    }),
    [variant, colors, roundness],
  );

  const iconColor = useMemo(
    () => getVariantColor(colors, variant),
    [variant, colors],
  );

  const textColor = useMemo(
    () => getOnVariantContainerColor(colors, variant),
    [variant, colors],
  );

  const source = useMemo(
    () =>
      variant === "warning"
        ? "alert"
        : variant === "error"
          ? "alert-circle"
          : variant === "success"
            ? "check-circle"
            : variant === "primary"
              ? "information"
              : variant === "secondary"
                ? "alert-octagon"
                : variant === "tertiary"
                  ? "information"
                  : undefined,
    [variant],
  );

  if (!children) return null;

  return (
    <View style={[alertStyle, props.style]}>
      {!hideIcon && (
        <Icon source={props.source || source} size={24} color={iconColor} />
      )}
      {typeof children === "string" ? (
        <Text
          style={[
            { color: textColor, flex: 1, textAlign: "left" },
            props.textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
    </View>
  );
}
