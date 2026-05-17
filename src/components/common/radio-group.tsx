import React, { useCallback } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { RadioButton } from "react-native-paper";

export type RadioItem = {
  label: string;
  value: string;
  [key: string]: string;
};

export interface RadioGroupProps extends Omit<
  React.ComponentProps<typeof RadioButton.Group>,
  "children"
> {
  data: string[] | RadioItem[];
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelKey?: string;
  valueKey?: string;
}

export default function RadioGroup({
  onValueChange,
  value,
  data,
  labelKey = "label",
  valueKey = "value",
  ...props
}: RadioGroupProps) {
  const renderItem = useCallback(
    (item: string | RadioItem) => {
      if (typeof item === "string") {
        return (
          <RadioButton.Item
            style={props.style}
            labelStyle={props.labelStyle}
            key={item}
            label={item}
            value={item}
          />
        );
      }

      return (
        <RadioButton.Item
          style={props.style}
          labelStyle={props.labelStyle}
          key={item[valueKey]}
          label={item[labelKey]}
          value={item[valueKey]}
        />
      );
    },
    [props.style, props.labelStyle],
  );

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      {data.map(renderItem)}
    </RadioButton.Group>
  );
}
