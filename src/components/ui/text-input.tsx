import useTheme from "@/hooks/use-theme";
import {
  forwardRef,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
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
  left?: ReactElement | string;
  right?: ReactElement | string;
  height?: number;
}

export default forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const { colors, borderRadius, borderWidth, fontSize, spacing } = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = useCallback(
    (e: FocusEvent) => {
      setIsFocused(true);
      props.onFocus?.(e);
    },
    [props.onFocus],
  );

  const onBlur = useCallback(
    (e: FocusEvent) => {
      setIsFocused(false);
      props.onBlur?.(e);
    },
    [props.onBlur],
  );

  const height = props.height || 50;

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      flex: 1,
      borderColor: isFocused ? colors.primary : colors.border,
      borderWidth: isFocused ? borderWidth + 1 : borderWidth,
      paddingHorizontal: spacing.lg,
      borderRadius,
      height: height - (borderWidth + 1),
      alignSelf: "center",
    }),
    [isFocused, colors, borderWidth, spacing, height],
  );

  return (
    <View style={[{ height }, props.style]}>
      <View style={[containerStyle, props.containerStyle]}>
        {typeof props.left === "string" ? (
          <Text style={{ color: colors.text, fontSize: fontSize.default }}>
            {props.left}
          </Text>
        ) : (
          props.left
        )}
        <RNTextInput
          ref={ref}
          {...props}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            {
              flex: 1,
              color: colors.text,
              paddingVertical: 8,
              fontSize: fontSize.default,
            },
            props.textInputStyle,
          ]}
          placeholderTextColor={colors.disabled}
        />
        {typeof props.right === "string" ? (
          <Text style={{ color: colors.text, fontSize: fontSize.default }}>
            {props.right}
          </Text>
        ) : (
          props.right
        )}
      </View>
    </View>
  );
});
