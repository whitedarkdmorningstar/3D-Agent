import { SettingsProvider } from "@/context/settings.context";
import useThemeScheme from "@/hooks/use-theme-scheme";
import { Stack, ThemeProvider } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
}

function App() {
  const { theme, statusBarStyle } = useThemeScheme();

  return (
    <KeyboardProvider
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            animation: "ios_from_right",
            statusBarStyle,
            statusBarTranslucent: true,
          }}
          initialRouteName={"(tabs)"}
        >
          <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
          <Stack.Screen
            name={"invoices"}
            options={{ headerTitle: "Invoices" }}
          />
          <Stack.Screen
            name={"customers"}
            options={{ headerTitle: "Customers" }}
          />
        </Stack>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
