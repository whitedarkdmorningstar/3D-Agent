import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        onPress={() => router.dismiss()}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Text></Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ maxWidth: 400, width: "88%" }}>{children}</View>
      </View>
    </>
  );
}
