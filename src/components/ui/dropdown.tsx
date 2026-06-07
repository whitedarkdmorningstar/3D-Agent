import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Button, { ButtonProps } from "./button";
import IconButton, { IconButtonProps } from "./icon-button";

type Item = {
  label: string;
  value: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  [key: string]: any;
};

export interface DropDownProps
  extends ButtonProps, Omit<IconButtonProps, "name"> {
  options: Item[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  position?: "start" | "end";
  name?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export default function DropDown({
  variant = "primary",
  mode = "contained",
  options,
  position = "start",
  ...props
}: DropDownProps) {
  const { colors, borderRadius, borderWidth, fontSize, spacing } = useTheme();

  const renderItem = useCallback(
    (item: Item, index: number) => (
      <Text
        style={[
          {
            color:
              item.value === props.selectedValue
                ? colors[variant]
                : colors.text,
            fontSize: fontSize.default,
            padding: spacing.md,
            borderBottomWidth: index === options.length - 1 ? 0 : borderWidth,
            borderColor: colors.border,
          },
        ]}
        key={item.value}
        onPress={() => {
          props.onValueChange(item.value);
          setVisible(false);
        }}
      >
        {item?.icon && (
          <MaterialCommunityIcons
            name={item.icon}
            size={item.size}
            color={
              item.value === props.selectedValue ? colors[variant] : colors.text
            }
          />
        )}
        {item.label}
      </Text>
    ),
    [
      fontSize,
      colors,
      variant,
      props.selectedValue,
      props.onValueChange,
      options,
      borderWidth,
      spacing,
    ],
  );

  // Dropdown visibility
  const [visible, setVisible] = useState<boolean>(false);

  const closeDropdown = useCallback(() => setVisible(false), []);

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      setVisible(true);
      props.onPress?.(e);
    },
    [props.onPress, setVisible],
  );

  // Anchor position
  const [anchorLayout, setAnchorLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const ref = useRef<View>(null);

  const handleAnchorPress = useCallback(() => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchorLayout({ x, y, width, height });
    });
  }, []);

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      handleAnchorPress();
      props.onPressIn?.(e);
    },
    [handleAnchorPress, props.onPressIn],
  );

  const { width } = useWindowDimensions();

  return (
    <View ref={ref}>
      {props.children ? (
        <Button {...props} onPress={handlePress} onPressIn={handlePressIn} />
      ) : (
        <IconButton
          name={"chevron-down"}
          {...props}
          onPress={handlePress}
          onPressIn={handlePressIn}
        />
      )}

      {/* Dropdown Menu */}
      <Modal transparent animationType="none" visible={visible}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }}
          onPress={closeDropdown}
        >
          {anchorLayout && (
            <View
              style={[
                {
                  position: "absolute",
                  top: anchorLayout.y + anchorLayout.height,
                  start: position === "start" ? anchorLayout.x : undefined,
                  end:
                    position === "end"
                      ? width - anchorLayout.x - anchorLayout.width
                      : undefined,
                  backgroundColor: colors.card,
                  borderRadius,
                  borderWidth,
                  borderColor: colors.border,
                  padding: spacing.lg,
                },
              ]}
            >
              {options.map(renderItem)}
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
