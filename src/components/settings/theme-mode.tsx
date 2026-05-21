import { THEME_MODE } from "@/constants/settings";
import useSettings from "@/hooks/use-settings";
import { List } from "react-native-paper";
import Card from "../common/card";
import RadioGroup, { type RadioItem } from "../common/radio-group";

const themeMode: RadioItem[] = [
  { label: "Light", value: THEME_MODE.LIGHT },
  { label: "Dark", value: THEME_MODE.DARK },
  { label: "System", value: THEME_MODE.SYSTEM },
];

export default function ThemeMode() {
  const { changeMode, mode } = useSettings();

  return (
    <List.Section title="Theme Mode">
      <Card>
        <RadioGroup
          data={themeMode}
          value={mode}
          onValueChange={changeMode as any}
        />
      </Card>
    </List.Section>
  );
}
