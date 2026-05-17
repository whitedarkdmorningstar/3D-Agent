import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator animating size={"small"} />
    </View>
  );
}
