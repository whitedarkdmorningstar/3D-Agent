import { Variant } from "@/constants/theme/types";
import useTheme from "@/hooks/use-theme";
import { getOnVariantColor } from "@/utils/colors";
import { useMemo } from "react";
import { FAB as PaperFAB, FABProps as PaperFABProps } from "react-native-paper";

type FABProps = Omit<PaperFABProps, "variant" | "label"> & {
  label?: string;
  shape?: "circle" | "square" | "rounded";
  variant?: Variant;
};

export default function FAB({
  shape = "circle",
  variant = "secondary",
  ...props
}: FABProps) {
  const { colors, roundness } = useTheme();

  const color = useMemo(
    () => getOnVariantColor(colors, variant),
    [variant, colors],
  );

  const backgroundColor = useMemo(
    () => (props.disabled ? colors.backdrop : colors[variant]),
    [props.disabled, variant, colors],
  );

  const borderRadius = useMemo(
    () => (shape === "circle" ? 100 : shape === "square" ? 0 : roundness),
    [shape, roundness],
  );

  return (
    <PaperFAB
      {...props}
      label=""
      color={color}
      style={[
        {
          borderRadius,
          backgroundColor,
        },
        props.style,
      ]}
    />
  );
}
