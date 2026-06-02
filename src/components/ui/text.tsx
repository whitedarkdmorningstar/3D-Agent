import { FontSizeKey, Variant } from "@/constants/theme/variables";
import useTheme from "@/hooks/use-theme";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
  variant?: Variant;
  mode?: FontSizeKey;
}

export default function Text({ mode, variant, ...props }: TextProps) {
  const { colors, fontSize } = useTheme();

  return (
    <RNText
      {...props}
      style={[
        {
          color: variant ? colors[variant as Variant] : colors.text,
          fontSize: fontSize[mode || "default"],
        },
        props.style,
      ]}
    />
  );
}
