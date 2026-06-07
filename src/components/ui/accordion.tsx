import useTheme from "@/hooks/use-theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

type Item = {
  title: string;
  content: React.ReactNode;
  value: string | number;
};

export interface AccordionProps {
  items: Item[];
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  multiple?: boolean;
  defaultValue?: string[] | number[];
  isScrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function Accordion({
  items,
  defaultValue = [],
  multiple = false,
  isScrollable = false,
  contentContainerStyle,
  ...props
}: AccordionProps) {
  const [active, setActive] = React.useState<Set<string | number>>(
    new Set([...defaultValue]),
  );
  const { colors, spacing, fontSize, borderWidth, borderRadius } = useTheme();

  const scrollRef = React.useRef<ScrollView>(null);
  const height = 50;

  const renderItem = React.useCallback(
    (item: Item, index: number) => {
      const isActive = active.has(item.value);

      return (
        <View key={item.value}>
          <TouchableHighlight
            underlayColor={colors.backdrop}
            style={{
              height: height,
              padding: spacing.md,
              borderWidth,
              justifyContent: "center",
              borderBottomWidth: isActive
                ? borderWidth
                : index === items.length - 1
                  ? borderWidth
                  : 0,
              borderColor: isActive ? colors.primary : colors.border,
              borderTopLeftRadius: index === 0 ? borderRadius : 0,
              borderTopRightRadius: index === 0 ? borderRadius : 0,
              borderBottomEndRadius: isActive
                ? 0
                : index === items.length - 1
                  ? borderRadius
                  : 0,
              borderBottomStartRadius: isActive
                ? 0
                : index === items.length - 1
                  ? borderRadius
                  : 0,
            }}
            onPress={() => {
              setActive((prev) => {
                if (multiple) {
                  const newSet = new Set(prev);

                  newSet.has(item.value)
                    ? newSet.delete(item.value)
                    : newSet.add(item.value);

                  return newSet;
                } else {
                  return isActive ? new Set([]) : new Set([item.value]);
                }
              });

              if (isScrollable) {
                scrollRef.current?.scrollTo({
                  y: index * height,
                  animated: true,
                });
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: spacing.lg,
              }}
            >
              <Text
                style={[
                  { fontSize: fontSize.default, flex: 1, color: colors.text },
                  props.titleStyle,
                ]}
              >
                {item.title}
              </Text>
              <MaterialCommunityIcons
                name={isActive ? "chevron-up" : "chevron-down"}
                size={24}
                color={colors.text}
              />
            </View>
          </TouchableHighlight>
          {isActive && (
            <View
              style={[
                {
                  padding: spacing.md,
                  backgroundColor: colors.backdrop,
                  borderBottomEndRadius:
                    index === items.length - 1 ? borderRadius : 0,
                  borderBottomStartRadius:
                    index === items.length - 1 ? borderRadius : 0,
                },
                props.contentStyle,
              ]}
            >
              {item.content}
            </View>
          )}
        </View>
      );
    },
    [
      active,
      colors,
      spacing,
      fontSize,
      props.contentStyle,
      props.titleStyle,
      borderRadius,
      items.length,
      multiple,
      borderWidth,
      isScrollable,
    ],
  );

  if (isScrollable) {
    return (
      <ScrollView contentContainerStyle={contentContainerStyle} ref={scrollRef}>
        {items.map(renderItem)}
      </ScrollView>
    );
  }

  return <>{items.map(renderItem)}</>;
}
