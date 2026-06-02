import useTheme from "@/hooks/use-theme";
import { View, ViewProps } from "react-native";

export interface CardProps extends ViewProps {}

export default function Card(props: CardProps) {
  const { colors, borderRadius, spacing } = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        },
        props.style,
      ]}
    />
  );
}
