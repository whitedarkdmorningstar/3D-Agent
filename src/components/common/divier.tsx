import { DividerProps, Divider as PaperDivider } from "react-native-paper";

export default function Divider(props: DividerProps) {
  return (
    <PaperDivider {...props} style={[{ marginVertical: 8 }, props.style]} />
  );
}
