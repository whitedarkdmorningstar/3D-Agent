import { THEME_MODE } from "@/constants/settings";
import { ThemeMode } from "@/constants/settings/schema";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { CombinedTheme } from "@/constants/theme/types";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import useSettings from "./use-settings";

export type CurrentThemeOutput = {
  resolvedMode: ThemeMode;
  statusBarStyle: "light" | "dark";
  theme: CombinedTheme;
};

export default function useCurrentTheme(): CurrentThemeOutput {
  const { mode } = useSettings();
  const isDark = useColorScheme() === "dark";

  const resolvedTheme = useMemo((): CurrentThemeOutput => {
    let resolvedMode = mode;

    if (mode === THEME_MODE.SYSTEM) {
      resolvedMode = isDark ? THEME_MODE.DARK : THEME_MODE.LIGHT;
    }
    const theme = resolvedMode === "dark" ? DARK_THEME : LIGHT_THEME;

    setBackgroundColorAsync(theme.colors.background);

    return {
      resolvedMode,
      statusBarStyle: resolvedMode === "dark" ? "light" : "dark",
      theme,
    };
  }, [isDark]);

  return resolvedTheme;
}
