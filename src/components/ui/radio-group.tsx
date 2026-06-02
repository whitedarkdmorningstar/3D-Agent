import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

type Option = {
  label: string | number;
  value: string | number;
  [key: string]: string | number;
};

export interface RadioProps {
  value: string | number;
  options: string[] | number[] | Option[];
  labelKey?: string;
  valueKey?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onValueChange: (value: any) => void;
}

export default function RadioGroup({
  value,
  options,
  labelKey = "label",
  valueKey = "value",
  onValueChange,
  ...props
}: RadioProps) {
  const { colors, fontSize, spacing } = useTheme();

  const renderItem = React.useCallback(
    (item: string | number | Option) => {
      const label =
        typeof item === "string" || typeof item === "number"
          ? item
          : item[labelKey];
      const itemValue =
        typeof item === "string" || typeof item === "number"
          ? item
          : item[valueKey];

      return (
        <TouchableWithoutFeedback
          onPress={() => onValueChange(itemValue)}
          key={itemValue}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
            }}
          >
            <Text
              style={[
                {
                  flex: 1,
                  color: colors.text,
                  fontSize: fontSize.default,
                  textTransform: "capitalize",
                },
                props.textStyle,
              ]}
            >
              {label}
            </Text>
            <Ionicons
              name={
                value === itemValue ? "radio-button-on" : "radio-button-off"
              }
              size={24}
              color={value === itemValue ? colors.primary : colors.disabled}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [value, fontSize.default, colors, props.textStyle],
  );

  return (
    <View style={[{ gap: spacing.md }, props.style]}>
      {options.map(renderItem)}
    </View>
  );
}
