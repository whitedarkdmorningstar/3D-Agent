import { Size } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";

export interface MainProps extends ViewProps, ScrollViewProps {
  size?: Size;
  isScrollable?: boolean;
}

export default function Main({
  size = "lg",
  isScrollable = false,
  ...props
}: MainProps) {
  const { spacing } = useTheme();
  const style = {
    padding: spacing[size],
    gap: spacing[size],
    paddingBottom: 100,
  };

  if (isScrollable) {
    return (
      <ScrollView
        {...props}
        contentContainerStyle={[style, props.contentContainerStyle]}
      />
    );
  }

  return <View {...props} style={[{ flex: 1 }, style, props.style]} />;
}
