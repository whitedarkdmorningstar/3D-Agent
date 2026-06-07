import { ToastAndroid } from "react-native";

export function toast(
  message: string,
  duration = ToastAndroid.SHORT,
  gravity = ToastAndroid.BOTTOM,
  xOffset = 80,
  yOffset = 0,
) {
  return ToastAndroid.showWithGravityAndOffset(
    message,
    duration,
    gravity,
    xOffset,
    yOffset,
  );
}
