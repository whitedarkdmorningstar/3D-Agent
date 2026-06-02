import { useSettings } from "@/context/settings.context";
import Card from "../ui/card";
import RadioGroup from "../ui/radio-group";
import Section from "../ui/section";

export default function ThemeMode() {
  const { mode, changeThemeMode } = useSettings();

  return (
    <Section title={"Theme"}>
      <Card>
        <RadioGroup
          options={[
            { label: "အလင်း", value: "light" },
            { label: "အမှောင်", value: "dark" },
            { label: "အလိုအလျောက်", value: "system" },
          ]}
          value={mode}
          onValueChange={changeThemeMode}
        />
      </Card>
    </Section>
  );
}
