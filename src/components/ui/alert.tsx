import { ICON_SIZE } from "@/constants/settings";
import { Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ReactNode, useMemo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

interface AlertProps extends Omit<ViewProps, "children"> {
  variant?: Variant;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  children?: string | ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  name?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
}

export default function Alert({
  variant = "error",
  title,
  description,
  children,
  name,
  size,
  ...props
}: AlertProps) {
  const { colors, borderRadius, borderWidth, fontSize, spacing } = useTheme();

  const alertStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      backgroundColor: colors.card,
      borderColor: colors[variant],
      borderWidth,
      borderRadius,
      padding: spacing.lg,
      gap: spacing.md,
    }),
    [variant, colors, borderRadius, borderWidth],
  );

  if (!Boolean(title) && !Boolean(description) && !Boolean(children))
    return null;

  return (
    <View style={[alertStyle, props.style]}>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}
      >
        {name && (
          <MaterialCommunityIcons
            name={name}
            size={size || ICON_SIZE}
            color={colors[variant]}
          />
        )}
        <View>
          {Boolean(title) && (
            <Text
              style={[
                {
                  color: colors[variant],
                  fontSize: fontSize.title,
                  fontWeight: "bold",
                },
                props.titleStyle,
              ]}
            >
              {title}
            </Text>
          )}
          {Boolean(description) && (
            <Text
              style={[
                { color: colors[variant], fontSize: fontSize.default },
                props.descriptionStyle,
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      </View>

      {Boolean(children) && <View style={props.contentStyle}>{children}</View>}
    </View>
  );
}
