import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";

export default function KeyboardAvoidingView(
  props: KeyboardAwareScrollViewProps,
) {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      bottomOffset={140}
      {...props}
      contentContainerStyle={[
        { paddingBottom: 64, gap: 16 },
        props.contentContainerStyle,
      ]}
    />
  );
}
