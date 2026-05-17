import { Week } from "@/constants/invoice/types";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { Settings } from "@/constants/settings/types";
import useStoredSettings from "@/hooks/use-stored-settings";
import React, { useCallback } from "react";

export interface SettingsContext extends Settings {
  changeMode: (mode: Settings["mode"]) => void;
  changeSettings: (
    key: keyof Settings,
    value: Settings[keyof Settings],
  ) => void;
  changeLimit: (limit: number) => void;
  changeYear: (year: number) => void;
  changeWeek: (week: Week) => void;
}

export const settingsContext = React.createContext<SettingsContext | undefined>(
  undefined,
);

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = React.useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  useStoredSettings(settings, setSettings, isLoading, setLoading);

  // Settings change handlers
  const changeSettings = useCallback(
    (key: keyof Settings, value: Settings[keyof Settings]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const changeMode = useCallback(
    (mode: Settings["mode"]) => {
      if (settings.mode === mode) return;

      setSettings((prev) => ({ ...prev, mode }));
    },
    [settings.mode],
  );

  const changeLimit = useCallback(
    (limit: number) => changeSettings("limit", limit),
    [],
  );

  const changeYear = useCallback(
    (year: number) => changeSettings("year", year),
    [],
  );

  const changeWeek = useCallback(
    (week: Week) => changeSettings("week", week),
    [],
  );

  const value = {
    ...settings,
    changeMode,
    changeSettings,
    changeLimit,
    changeYear,
    changeWeek,
  };

  if (isLoading) return null;

  return (
    <settingsContext.Provider value={value}>
      {children}
    </settingsContext.Provider>
  );
}
