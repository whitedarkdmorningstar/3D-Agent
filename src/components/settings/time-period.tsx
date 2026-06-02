import { generateWeekDuration } from "@/constants/invoice/week";
import { useSettings } from "@/context/settings.context";
import { formatedDateTime } from "@/utils/date-formats";
import { useMemo } from "react";
import ListItem from "../ui/list-item";
import NumberInput from "../ui/number-input";
import Section from "../ui/section";

export default function TimePeriod() {
  const { week, year, changeWeek, changeYear } = useSettings();

  const period = useMemo(() => {
    const { start, end } = generateWeekDuration(week, year);
    return `${formatedDateTime(start).date} မှ ${formatedDateTime(end).date} ထိ`;
  }, [week, year]);

  return (
    <Section title="Time Period">
      <ListItem
        title={"အပတ်စဥ်"}
        description={period}
        right={
          <NumberInput
            value={week}
            minimumValue={1}
            maximumValue={24}
            onValueChange={changeWeek}
          />
        }
      />
      <ListItem
        title={"နှစ်"}
        right={
          <NumberInput
            value={year}
            minimumValue={1990}
            maximumValue={2990}
            onValueChange={changeYear}
          />
        }
      />
    </Section>
  );
}
