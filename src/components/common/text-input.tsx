// import { TextInput as PaperTextInput } from "react-native-paper";

// export default function TextInput(
//   props: React.ComponentProps<typeof PaperTextInput>,
// ) {
//   return <PaperTextInput mode={"outlined"} dense {...props} />;
// }

// TextInput.Afflix = PaperTextInput.Affix;
// TextInput.Icon = PaperTextInput.Icon;

import useTheme from "@/hooks/use-theme";
import React, { forwardRef, ReactElement, useCallback, useState } from "react";
import {
  FocusEvent,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";

export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  textInputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  left?: ReactElement | string;
  right?: ReactElement | string;
  height?: number;
}

export default forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const { colors, roundness, fonts } = useTheme();
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

  return (
    <View style={[{ height }, props.style]}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            flex: 1,
            borderColor: isFocused ? colors.primary : colors.border,
            borderWidth: isFocused ? 2 : 1,
            paddingHorizontal: 8,
            borderRadius: roundness,
            height: height - 2,
            alignSelf: "center",
          },
          props.contentContainerStyle,
        ]}
      >
        {typeof props.left === "string" ? (
          <Text>{props.left}</Text>
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
              color: colors.onSurface,
              paddingVertical: 8,
            },
            fonts.default,
            props.textInputStyle,
          ]}
          placeholderTextColor={colors.onSurfaceDisabled}
        />
        {typeof props.right === "string" ? (
          <Text>{props.right}</Text>
        ) : (
          props.right
        )}
      </View>
    </View>
  );
});
