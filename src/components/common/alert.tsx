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
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  children?: string | ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  source?: string;
  hideIcon?: boolean;
}

export default function Alert({
  variant = "error",
  title,
  description,
  children,
  hideIcon = false,
  ...props
}: AlertProps) {
  const { colors, roundness, fonts } = useTheme();

  const alertStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      backgroundColor: getVariantContainerColor(colors, variant),
      borderColor: getVariantColor(colors, variant),
      borderWidth: 1,
      borderRadius: roundness * roundness,
      padding: 16,
      gap: 16,
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

  if (!Boolean(title)) return null;

  return (
    <View style={[alertStyle, props.style]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {!hideIcon && source && (
          <Icon source={source} size={24} color={iconColor} />
        )}
        <Text
          style={[{ color: textColor }, fonts.titleMedium, props.titleStyle]}
        >
          {title}
        </Text>
      </View>

      {Boolean(description) && (
        <Text style={[{ color: textColor }, props.descriptionStyle]}>
          {description}
        </Text>
      )}
      {Boolean(children) && <View style={props.contentStyle}>{children}</View>}
    </View>
  );
}
