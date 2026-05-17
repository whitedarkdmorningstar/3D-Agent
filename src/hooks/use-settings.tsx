import { settingsContext } from "@/context/settings.context";
import React from "react";

export default function useSettings() {
  const ctx = React.useContext(settingsContext);

  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return ctx;
}
