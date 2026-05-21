import useTheme from "@/hooks/use-theme";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";

const ENG_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function toNativeNumber(value: number, nativeNumbers?: string[]) {
  if (!nativeNumbers) return value;

  return value
    .toString()
    .split("")
    .map((num) => nativeNumbers[Number(num)])
    .join("");
}

export interface NumberInputProps {
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  value: number;
  iconSize?: number;
  buttonMode?: "contained" | "contained-tonal" | "outlined";
  onValueChange: (value: number) => void;
  nativeNumbers?: string[];
  showButtons?: boolean;
  disabledTextInput?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

export default function NumberInput({
  nativeNumbers,
  value,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  onValueChange,
  showButtons = true,
  disabledTextInput = true,
  textInputStyle,
  style,
  buttonStyle,
  iconSize = 20,
  buttonMode = "contained",
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState<number>(value || 0);

  useEffect(() => {
    if (internalValue !== value) onValueChange?.(internalValue);
  }, [internalValue, onValueChange]);

  const label = useMemo(
    () => toNativeNumber(internalValue, nativeNumbers),
    [internalValue, nativeNumbers],
  );

  const intervalRef = useRef<number | null>(null);

  const updateValue = useCallback(
    (delta: number) => {
      setInternalValue((prev) =>
        Math.min(Math.max(prev + delta, minimumValue), maximumValue),
      );
    },
    [minimumValue, maximumValue],
  );

  const startContinuousUpdate = useCallback(
    (delta: number) => {
      intervalRef.current = setInterval(() => {
        setInternalValue((prev) =>
          Math.min(Math.max(prev + delta, minimumValue), maximumValue),
        );
      }, 100);
    },
    [setInternalValue, minimumValue, maximumValue],
  );

  const stopContinuousUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const onChangeText = useCallback((value: string) => {
    let newValue = Number(value);
    if (!isNaN(newValue)) {
      newValue = Math.min(Math.max(newValue, minimumValue), maximumValue);
      onValueChange?.(newValue);
    } else {
      onValueChange?.(0);
    }
  }, []);

  const { colors } = useTheme();

  useEffect(() => {
    return stopContinuousUpdate;
  }, [stopContinuousUpdate]);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
        style,
      ]}
    >
      {showButtons && (
        <IconButton
          icon="minus"
          iconColor={colors.text}
          delayLongPress={300}
          onPressIn={() => updateValue(-step)}
          onLongPress={() => startContinuousUpdate(-step)}
          onPressOut={stopContinuousUpdate}
          style={buttonStyle}
          size={iconSize}
          mode={buttonMode}
        />
      )}
      {disabledTextInput ? (
        <Text
          style={[{ textAlign: "center", marginHorizontal: 4 }, textInputStyle]}
        >
          {label}
        </Text>
      ) : (
        <TextInput
          keyboardType="numeric"
          dense
          mode="outlined"
          value={label.toString()}
          style={[{ textAlign: "center" }, textInputStyle]}
          onChangeText={onChangeText}
        />
      )}
      {showButtons && (
        <IconButton
          icon="plus"
          iconColor={colors.text}
          delayLongPress={300}
          onPressIn={() => updateValue(step)}
          onLongPress={() => startContinuousUpdate(step)}
          onPressOut={stopContinuousUpdate}
          style={buttonStyle}
          size={iconSize}
          mode={buttonMode}
        />
      )}
    </View>
  );
}
