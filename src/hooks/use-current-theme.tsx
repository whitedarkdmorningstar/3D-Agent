import { THEME_MODE } from "@/constants/settings";
import { ThemeMode } from "@/constants/settings/types";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { CombinedTheme } from "@/constants/theme/types";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import useSettings from "./use-settings";

export type CurrentThemeHook = {
  resolvedMode: ThemeMode;
  statusBarStyle: "light" | "dark";
  theme: CombinedTheme;
};

export default function useCurrentTheme(): CurrentThemeHook {
  const { mode } = useSettings();
  const isDark = useColorScheme() === "dark";

  const resolvedTheme = useMemo((): CurrentThemeHook => {
    let resolvedMode = mode;

    if (mode === THEME_MODE.SYSTEM) {
      resolvedMode = isDark ? THEME_MODE.DARK : THEME_MODE.LIGHT;
    }

    return {
      resolvedMode,
      statusBarStyle: resolvedMode === "dark" ? "light" : "dark",
      theme: resolvedMode === "dark" ? DARK_THEME : LIGHT_THEME,
    };
  }, [isDark]);

  return resolvedTheme;
}
