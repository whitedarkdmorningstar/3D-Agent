import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import Row, { RowProps } from "./row";
import Text from "./text";

export interface DetailProps extends RowProps {
  label: ReactNode;
  value: ReactNode;
  startFlex?: number;
  endFlex?: number;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

export default function Detail({
  label,
  value,
  startFlex = 1,
  endFlex = 1,
  labelStyle,
  valueStyle,
  ...props
}: DetailProps) {
  return (
    <Row {...props}>
      <Text style={[{ flex: startFlex }, labelStyle]}>{label}</Text>
      <Text style={[{ flex: endFlex }, valueStyle]}>{value}</Text>
    </Row>
  );
}
