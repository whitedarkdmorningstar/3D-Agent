import useTheme from "@/hooks/use-theme";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  FocusEvent,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  textInputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  left?: React.ReactNode;
  right?: React.ReactNode;
  height?: number;
}

export default forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const { colors, borderRadius, borderWidth, fontSize, spacing } = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { left, right, ...rest } = props;

  const onFocus = useCallback(
    (e: FocusEvent) => {
      setIsFocused(true);
      rest.onFocus?.(e);
    },
    [rest.onFocus],
  );

  const onBlur = useCallback(
    (e: FocusEvent) => {
      setIsFocused(false);
      rest.onBlur?.(e);
    },
    [rest.onBlur],
  );

  const height = rest.height || 50;

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      borderColor: isFocused ? colors.primary : colors.border,
      borderWidth: isFocused ? borderWidth + 1 : borderWidth,
      paddingHorizontal: spacing.lg,
      borderRadius,
      height,
      alignSelf: "center",
    }),
    [isFocused, colors, borderWidth, borderRadius, spacing, height],
  );

  return (
    <View style={[rest.style]}>
      <View style={[containerStyle, rest.containerStyle]}>
        {typeof left === "string" ? (
          <Text style={{ color: colors.text, fontSize: fontSize.default }}>
            {left}
          </Text>
        ) : (
          left
        )}
        <RNTextInput
          ref={ref}
          {...rest}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            {
              flex: 1,
              color: colors.text,
              paddingVertical: 8,
              fontSize: fontSize.default,
            },
            rest.textInputStyle,
          ]}
          placeholderTextColor={colors.disabled}
        />
        {typeof right === "string" ? (
          <Text style={{ color: colors.text, fontSize: fontSize.default }}>
            {right}
          </Text>
        ) : (
          right
        )}
      </View>
    </View>
  );
});
