import Icon from "@/components/common/icon";
import AnimatedTabBar from "@/components/layout/animated-tab-bar";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <AnimatedTabBar {...props} tabBarIcons={TAB_BAR_ICONS} />
      )}
      screenOptions={{
        headerShown: false,
        animation: "shift",
        lazy: true,
      }}
      screenLayout={(props) => <SafeAreaView style={{ flex: 1 }} {...props} />}
    >
      <Tabs.Screen name={"index"} options={{ title: "ပင်မ" }} />
      <Tabs.Screen name={"new-invoice"} options={{ title: "အသစ်" }} />
      <Tabs.Screen name={"settings"} options={{ title: "ချိန်ညှိ" }} />
    </Tabs>
  );
}

type IconProps = { isFocused: boolean; color: string };

const TAB_BAR_ICONS = {
  index: (props: IconProps) => (
    <Icon {...props} name={props.isFocused ? "home" : "home-outline"} />
  ),
  settings: (props: IconProps) => (
    <Icon {...props} name={props.isFocused ? "cog" : "cog-outline"} />
  ),
  "new-invoice": (props: IconProps) => (
    <Icon {...props} name={props.isFocused ? "add" : "add-outline"} />
  ),
};
