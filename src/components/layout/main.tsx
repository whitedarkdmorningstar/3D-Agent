import { ScrollView, ScrollViewProps, View, ViewProps } from "react-native";

const sizes = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface MainProps extends ViewProps, ScrollViewProps {
  size?: Size;
  isScrollable?: boolean;
}

export default function Main({
  size = "md",
  isScrollable = false,
  ...props
}: MainProps) {
  const style = { padding: sizes[size], gap: sizes[size], paddingBottom: 100 };

  if (isScrollable) {
    return (
      <ScrollView
        {...props}
        contentContainerStyle={[style, props.contentContainerStyle]}
      />
    );
  }

  return <View {...props} style={[style, props.style]} />;
}
