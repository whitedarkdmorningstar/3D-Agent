import SettingsProvider from "@/context/settings.context";
import useCurrentTheme from "@/hooks/use-current-theme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
}

function App() {
  const { theme, statusBarStyle } = useCurrentTheme();

  return (
    <KeyboardProvider>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <Stack
            screenOptions={{
              animation: "ios_from_right",
            }}
          >
            <Stack.Screen
              name={"(tabs)"}
              options={{ title: "Tabs", headerShown: false }}
            />
            <Stack.Screen
              name={"invoice/[id]"}
              options={({ route }: any) => ({
                title: `စာရင်းအမှတ် #${route.params.id}`,
              })}
            />
            <Stack.Screen name={"invoices"} options={{ title: "Invoices" }} />
            <Stack.Screen
              name={"customer/[name]"}
              options={{ title: "Loading ..." }}
            />
            <Stack.Screen
              name={"customers"}
              options={{ title: "စျေးဝယ်များ" }}
            />
          </Stack>
          <StatusBar style={statusBarStyle} />
        </ThemeProvider>
      </PaperProvider>
    </KeyboardProvider>
  );
}
