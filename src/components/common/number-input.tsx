import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";

const ENG_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function toNativeNumber(value: number, nativeNumbers = ENG_NUMBERS) {
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
  value?: number;
  defaultValue?: number;
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
  nativeNumbers = ENG_NUMBERS,
  value,
  defaultValue,
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
  const [internalValue, setInternalValue] = useState<number>(defaultValue || 0);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : internalValue;

  const setValue = useCallback(
    (updater: (prev: number) => number) => {
      if (isControlled) {
        const next = updater(currentValue);
        next !== currentValue && onValueChange?.(next);
      } else {
        setInternalValue((prev) => {
          const next = updater(prev);
          return next;
        });
      }
    },
    [isControlled, onValueChange, currentValue],
  );

  useEffect(() => {
    if (internalValue !== value) onValueChange?.(internalValue);
  }, [internalValue, onValueChange]);

  const label = useMemo(
    () => toNativeNumber(currentValue, nativeNumbers),
    [currentValue, nativeNumbers],
  );

  const intervalRef = useRef<number | null>(null);

  const updateValue = useCallback(
    (delta: number) => {
      setValue((prev) =>
        Math.min(Math.max(prev + delta, minimumValue), maximumValue),
      );
    },
    [minimumValue, maximumValue],
  );

  const startContinuousUpdate = useCallback(
    (delta: number) => {
      intervalRef.current = setInterval(() => {
        setValue((prev) =>
          Math.min(Math.max(prev + delta, minimumValue), maximumValue),
        );
      }, 100);
    },
    [setValue, minimumValue, maximumValue],
  );

  const stopContinuousUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

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
          value={label}
          style={[{ textAlign: "center" }, textInputStyle]}
          onChangeText={(value) => {
            let newValue = Number(value);
            if (!Number.isNaN(newValue)) {
              newValue = Math.min(
                Math.max(newValue, minimumValue),
                maximumValue,
              );
              onValueChange?.(newValue);
            }
          }}
        />
      )}
      {showButtons && (
        <IconButton
          icon="plus"
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
