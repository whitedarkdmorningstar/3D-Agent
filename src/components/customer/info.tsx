import { generateWeekDuration } from "@/constants/invoice/week";
import { useSettings } from "@/context/settings.context";
import { formatedDateTime } from "@/utils/date-formats";
import { useMemo } from "react";
import { Detail } from "../invoice/info";
import Card from "../ui/card";

export default function Info() {
  const { week, year } = useSettings();

  const period = useMemo(() => {
    const { start, end } = generateWeekDuration(week, year);

    return `${formatedDateTime(start).date} မှ ${formatedDateTime(end).date} ထိ`;
  }, [week, year]);

  return (
    <Card>
      <Detail label="အပတ်စဥ်" value={`${week} (${period})`} />
      <Detail label={"နှစ်"} value={year.toString()} />
    </Card>
  );
}
