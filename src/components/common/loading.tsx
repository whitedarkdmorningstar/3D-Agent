import { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface LoadingProps extends React.ComponentProps<typeof ActivityIndicator> {
  isScreen?: boolean;
  minHeight?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function Loading({
  isScreen,
  minHeight = 100,
  ...props
}: LoadingProps) {
  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () =>
      isScreen
        ? { flex: 1, justifyContent: "center", alignItems: "center" }
        : {
            justifyContent: "center",
            alignItems: "center",
            minHeight: minHeight,
          },
    [isScreen, minHeight],
  );

  return (
    <View style={[containerStyle, props.contentContainerStyle]}>
      <ActivityIndicator animating size={"small"} {...props} />
    </View>
  );
}
