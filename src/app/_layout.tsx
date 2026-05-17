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
              animation: "slide_from_right",
              animationDuration: 200,
            }}
          >
            <Stack.Screen
              name={"(tabs)"}
              options={{ title: "Tabs", headerShown: false }}
            />
          </Stack>
          <StatusBar style={statusBarStyle} />
        </ThemeProvider>
      </PaperProvider>
    </KeyboardProvider>
  );
}
