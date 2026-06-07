import { ICON_SIZE } from "@/constants/settings";
import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

export interface ListItemProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: React.ComponentProps<typeof MaterialCommunityIcons>["size"];
  color?: React.ComponentProps<typeof MaterialCommunityIcons>["color"];
  right?: React.ReactNode;
}

export default function ListItem({
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  description,
  descriptionStyle,
  icon,
  size = ICON_SIZE,
  color,
  style,
  right,
  ...props
}: ListItemProps) {
  const { colors, spacing, borderRadius, borderWidth, fontSize } = useTheme();

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius,
      backgroundColor: colors.card,
      borderWidth,
      borderColor: colors.border,
    }),
    [spacing, borderRadius, colors, borderWidth],
  );

  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <View style={[containerStyle, style]}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              { color: colors.text, fontSize: fontSize.default },
              titleStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                { color: colors.text, fontSize: fontSize.label },
                subtitleStyle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
          )}
          {description && (
            <Text
              style={[
                { color: colors.text, fontSize: fontSize.label },
                descriptionStyle,
              ]}
            >
              {description}
            </Text>
          )}
        </View>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={size}
            color={color || colors.text}
          />
        )}
        {right}
      </View>
    </TouchableOpacity>
  );
}
