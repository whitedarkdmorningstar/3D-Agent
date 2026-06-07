import Icon from "@/components/ui/icon";
import useTheme from "@/hooks/use-theme";
import { Tabs } from "expo-router";
import { ColorValue, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconProps = { focused: boolean; color: ColorValue; size: number };

// Tab bar icons
const ICONS = {
  index: (props: IconProps) => (
    <Icon name={props.focused ? "home" : "home-outline"} {...props} />
  ),
  "new-invoice": (props: IconProps) => <Icon name={"plus"} {...props} />,
  settings: (props: IconProps) => (
    <Icon name={props.focused ? "cog" : "cog-outline"} {...props} />
  ),
};

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { borderColor: colors.border }],
        tabBarItemStyle: { height: 60 },
      }}
      screenLayout={(props: any) => (
        <SafeAreaView style={{ flex: 1 }} {...props} />
      )}
      initialRouteName={"index"}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "ပင်မ", tabBarIcon: ICONS.index }}
      />
      <Tabs.Screen
        name="new-invoice"
        options={{ title: "အသစ်", tabBarIcon: ICONS["new-invoice"] }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "ချိန်ညှိ", tabBarIcon: ICONS.settings }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,
    width: "80%",
    start: "10%",
    height: 60,
    elevation: 4,
    borderRadius: 100,
    borderTopWidth: 1,
    borderWidth: 1,
  },
});
