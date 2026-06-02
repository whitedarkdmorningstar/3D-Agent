import { Variant } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { View } from "react-native";

export interface DividerProps {
  variant?: Variant;
}

export default function Divider(props: DividerProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: props.variant
          ? colors[props.variant as Variant]
          : colors.border,
        marginVertical: spacing.md,
      }}
    />
  );
}
