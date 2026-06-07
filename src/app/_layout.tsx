import CustomersListActions from "@/components/customers/list-actions";
import DigitsListActions from "@/components/digits/list-actions";
import InvoicesListActions from "@/components/invoices/list-actions";
import TrashesListActions from "@/components/trashes/list-actions";
import { CustomersProvider } from "@/context/customers.context";
import { InvoicesProvider } from "@/context/invoices.context";
import { SettingsProvider } from "@/context/settings.context";
import { TrashesProvider } from "@/context/trashes.context";
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

const modalOption: any = {
  presentation: "transparentModal",
  headerShown: false,
  animation: "fade",
  animationDuration: 150,
};

function App() {
  const { theme, statusBarStyle } = useThemeScheme();

  return (
    <KeyboardProvider
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <ThemeProvider value={theme}>
        <InvoicesProvider>
          <TrashesProvider>
            <CustomersProvider>
              <Stack
                screenOptions={{
                  animation: "simple_push",
                  animationDuration: 150,
                  statusBarStyle,
                  statusBarTranslucent: true,
                }}
                initialRouteName={"(tabs)"}
              >
                <Stack.Screen
                  name={"(tabs)"}
                  options={{ headerShown: false }}
                />

                {/**Invoices */}
                <Stack.Screen
                  name={"invoices"}
                  options={{
                    title: "စာရင်းများ",
                    headerRight: () => <InvoicesListActions />,
                  }}
                />
                <Stack.Screen
                  name={"invoice/[id]"}
                  options={({ route }: any) => ({
                    title:
                      `စာရင်းအမှတ် ${route.params.id}` || "စာရင်းအမှတ် ...",
                  })}
                />

                {/**Customers */}
                <Stack.Screen
                  name={"customers"}
                  options={{
                    title: "စျေးဝယ်များ",
                    headerRight: () => <CustomersListActions />,
                  }}
                />
                <Stack.Screen
                  name={"customer/[name]"}
                  options={({ route }: any) => ({
                    title: `${route.params.name}` || "...",
                  })}
                />
                <Stack.Screen
                  name={"search-customer"}
                  options={{ headerShown: false }}
                />

                {/**Trashes */}
                <Stack.Screen
                  name={"trashes"}
                  options={{
                    title: "အမှိုက်ပုံး",
                    headerRight: () => <TrashesListActions />,
                  }}
                />

                {/**Digits */}
                <Stack.Screen
                  name={"search-digit"}
                  options={{
                    title: "ဂဏန်းဖြင့် ရှာပါ",
                  }}
                />
                <Stack.Screen
                  name={"digit/[digit]"}
                  options={({ route }: any) => ({
                    title: route.params.digit || "ဂဏန်းဖြင့် ရှာပါ",
                  })}
                />
                <Stack.Screen
                  name={"digits"}
                  options={{
                    title: "ဂဏန်းများ",
                    headerRight: () => <DigitsListActions />,
                  }}
                />

                {/**Modal screens */}
                <Stack.Screen
                  name={"modals/invoice-confirm-modal"}
                  options={modalOption}
                />
                <Stack.Screen
                  name={"modals/invoices-confirm-modal"}
                  options={modalOption}
                />
                <Stack.Screen
                  name={"modals/trashes-confirm-modal"}
                  options={modalOption}
                />
              </Stack>
            </CustomersProvider>
          </TrashesProvider>
        </InvoicesProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
