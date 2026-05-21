import { generateWeekDuration } from "@/constants/invoice/week";
import useSettings from "@/hooks/use-settings";
import { formatedDateTime } from "@/utils/date-formats";
import { useMemo } from "react";
import { List } from "react-native-paper";
import Card from "../common/card";
import NumberInput from "../common/number-input";

export default function TimePeriod() {
  const { week, year, changeWeek, changeYear } = useSettings();

  const period = useMemo(() => {
    const { start, end } = generateWeekDuration(week, year);
    return `${formatedDateTime(start).date} မှ ${formatedDateTime(end).date} ထိ`;
  }, [week, year]);

  return (
    <List.Section title="Time Period">
      <Card>
        <List.Item
          title={"အပတ်စဥ်"}
          description={period}
          right={() => (
            <NumberInput
              value={week}
              minimumValue={1}
              maximumValue={24}
              onValueChange={changeWeek}
            />
          )}
        />
        <List.Item
          title={"နှစ်"}
          right={() => (
            <NumberInput
              value={year}
              minimumValue={1990}
              maximumValue={2990}
              onValueChange={changeYear}
            />
          )}
        />
      </Card>
    </List.Section>
  );
}
