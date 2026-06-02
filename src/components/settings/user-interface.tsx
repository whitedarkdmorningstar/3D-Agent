import { useSettings } from "@/context/settings.context";
import ListItem from "../ui/list-item";
import NumberInput from "../ui/number-input";
import Section from "../ui/section";

export default function UserInterface() {
  const { limit, changeLimit } = useSettings();

  return (
    <Section title={"User Interface"}>
      <ListItem
        title={"စာရင်းအရေအတွက်"}
        right={
          <NumberInput
            value={limit}
            maximumValue={10}
            minimumValue={2}
            onValueChange={changeLimit}
          />
        }
      />
    </Section>
  );
}
