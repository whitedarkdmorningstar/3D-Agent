import { Theme } from "@/constants/theme";
import { useTheme as useExpoRouterTheme } from "expo-router";

export default function useTheme(): Theme {
  return useExpoRouterTheme() as Theme;
}
