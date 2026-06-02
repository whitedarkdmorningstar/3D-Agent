import useTheme from "@/hooks/use-theme";
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

export interface SectionProps extends ViewProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  right?: React.ReactNode;
}

export default function Section({
  title,
  titleStyle,
  right,
  ...props
}: SectionProps) {
  const { colors, fontSize, spacing } = useTheme();

  return (
    <View style={props.containerStyle}>
      <View
        style={{
          flexDirection: "row",
          gap: spacing.md,
          paddingHorizontal: spacing.md,
          marginBottom: spacing.md,
          alignItems: "center",
        }}
      >
        <Text
          style={[
            { color: colors.text, fontSize: fontSize.default, flex: 1 },
            titleStyle,
          ]}
        >
          {title}
        </Text>
        {right}
      </View>
      <View {...props} style={[{ gap: spacing.sm }, props.style]} />
    </View>
  );
}
