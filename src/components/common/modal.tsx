import { View } from "react-native";
import {
  Modal as PaperModal,
  ModalProps as PaperModalProps,
  Portal,
} from "react-native-paper";

interface ModalProps extends PaperModalProps {}

export default function Modal(props: ModalProps) {
  return (
    <Portal>
      <PaperModal {...props}>
        <View
          style={{
            maxWidth: 400,
            width: "88%",
            alignSelf: "center",
          }}
        >
          {props.children}
        </View>
      </PaperModal>
    </Portal>
  );
}
