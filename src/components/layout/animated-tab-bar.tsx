import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutChangeEvent, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Card from "../common/card";

const TAB_BAR = {
  ANIMATION_DURATION: 200,
  HEIGHT: 64,
};

export interface AnimatedTabBarProps extends BottomTabBarProps {
  tabBarIcons: any;
  animationDuration?: number;
  height?: number;
}

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
  tabBarIcons,
  animationDuration = TAB_BAR.ANIMATION_DURATION,
  height = TAB_BAR.HEIGHT,
}: AnimatedTabBarProps) {
  const { colors } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 20, height: 100 });

  const buttonWidth = useMemo(
    () => dimensions.width / state.routes.length,
    [dimensions.width, state.routes.length],
  );

  const onTabBarLayout = useCallback((event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
  }, []);

  const tabPositionX = useSharedValue(state.index * buttonWidth + 8);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          tabPositionX.value,
          [0, buttonWidth],
          [0, buttonWidth],
        ),
      },
    ],
  }));

  const renderItem = useCallback(
    (
      route: BottomTabBarProps["descriptors"][string]["route"],
      index: number,
    ) => {
      const { options } = descriptors[route.key];
      const label: string =
        options.title !== undefined ? options.title : route.name;

      const isFocused = state.index === index;

      const color = isFocused ? colors.primary : colors.onSurfaceDisabled;

      const onPress = () => {
        tabPositionX.value = withTiming(index * buttonWidth + 8, {
          duration: animationDuration,
        });

        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: "tabLongPress",
          target: route.key,
        });
      };

      const scale = useSharedValue(0);

      useEffect(() => {
        scale.value = withTiming(isFocused ? 1 : 0, {
          duration: animationDuration,
        });
      }, [isFocused, scale]);

      // Don't hide the text on blur
      const animatedTextStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.1]) }],
        top: interpolate(scale.value, [0, 1], [0, 1]),
      }));

      const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.1]) }],
        top: interpolate(scale.value, [0, 1], [0, 1]),
      }));

      return (
        <TouchableOpacity
          key={route.name}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          onPress={onPress}
          onLongPress={onLongPress}
          activeOpacity={0.6}
          style={[{ flex: 1, alignItems: "center", justifyContent: "center" }]}
        >
          <Animated.View style={animatedIconStyle}>
            {tabBarIcons[route.name as keyof typeof tabBarIcons]({
              color,
              isFocused,
            })}
          </Animated.View>
          <Animated.Text
            style={[
              {
                color: color,
                fontSize: 10,
              },
              animatedTextStyle,
            ]}
          >
            {label}
          </Animated.Text>
        </TouchableOpacity>
      );
    },
    [navigation, descriptors, state, colors, buttonWidth],
  );

  return (
    <Card
      onLayout={onTabBarLayout}
      style={{
        position: "absolute",
        bottom: 24,
        borderRadius: 100,
        start: 0,
        end: 0,
        marginHorizontal: 64,
      }}
      contentStyle={{
        flexDirection: "row",
        height: height,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Animated.View
        style={[
          animatedButtonStyle,
          {
            position: "absolute",
            width: buttonWidth - 16,
            height: 52,
            borderRadius: 100,
            backgroundColor: colors.onPrimary,
          },
        ]}
      />
      {state.routes.map(renderItem)}
    </Card>
  );
}
