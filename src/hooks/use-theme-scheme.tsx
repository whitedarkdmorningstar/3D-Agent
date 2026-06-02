import { THEME_MODE } from "@/constants/settings";
import { ThemeMode } from "@/constants/settings/schema";
import { Theme, THEME } from "@/constants/theme";
import { useSettings } from "@/context/settings.context";
import { setBackgroundColorAsync } from "expo-system-ui";
import React from "react";
import { useColorScheme } from "react-native";

export type ThemeSchemeOutput = {
  resolvedMode: ThemeMode;
  statusBarStyle: "light" | "dark";
  theme: Theme;
};

export default function useThemeScheme(): ThemeSchemeOutput {
  const { mode } = useSettings();
  const isDark = useColorScheme() === "dark";

  const resolvedTheme = React.useMemo((): ThemeSchemeOutput => {
    let resolvedMode = mode;

    if (mode === THEME_MODE.SYSTEM) {
      resolvedMode = isDark ? THEME_MODE.DARK : THEME_MODE.LIGHT;
    }
    const theme = resolvedMode === "dark" ? THEME.DARK : THEME.LIGHT;

    setBackgroundColorAsync(theme.colors.background);

    return {
      resolvedMode,
      statusBarStyle: resolvedMode === "dark" ? "light" : "dark",
      theme,
    };
  }, [isDark]);

  return resolvedTheme;
}
