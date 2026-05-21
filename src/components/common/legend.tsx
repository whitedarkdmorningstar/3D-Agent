import React from "react";
import { Text } from "react-native-paper";

export default function Legend(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      variant="labelLarge"
      {...props}
      style={[{ textAlign: "center", paddingVertical: 16 }, props.style]}
    >
      {props.children}
    </Text>
  );
}
