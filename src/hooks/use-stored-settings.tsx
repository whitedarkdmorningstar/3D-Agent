/**Splashscreen will be handled here */
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { Settings } from "@/constants/settings/types";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

// Prevent splash screen from autohiding
SplashScreen.preventAutoHideAsync();

// Backup and restore settings
export default function useStoredSettings(
  settings: Settings,
  setSettings: React.Dispatch<React.SetStateAction<Settings>>,
  isLoading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { getItem, setItem, removeItem } = useAsyncStorage("settings");

  // On start of the app
  // Get stored settings
  useEffect(() => {
    const getStoredSettings = async () => {
      try {
        // TODO: Remove this after testing
        await removeItem();
        const storedSettings = await getItem();

        // Mixed with default settings
        if (storedSettings) {
          setSettings({ ...DEFAULT_SETTINGS });
        } else {
          setSettings(DEFAULT_SETTINGS);
        }

        setLoading(false);

        // Hide splash screen
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 200);
      } catch (e) {
        console.log(e);
      }
    };

    getStoredSettings();
  }, []);

  // Everytime a settings change, store it
  useEffect(() => {
    const storeSettings = async () => {
      try {
        await setItem(JSON.stringify(settings));
      } catch (e) {
        console.log(e);
      }
    };

    if (!isLoading) {
      storeSettings();
    }
  }, [settings, isLoading]);
}
