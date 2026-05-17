import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";

interface IconProps extends Omit<
  React.ComponentProps<typeof Ionicons>,
  "color"
> {}

export default function Icon(props: IconProps) {
  const { colors } = useTheme();

  return <Ionicons color={colors.onBackground} size={24} {...props} />;
}
