import { InvoiceOutput } from "@/constants/invoice/schema";
import { generateWeekDuration } from "@/constants/invoice/week";
import { formatedDateTime } from "@/utils/date-formats";
import { useMemo } from "react";
import { View } from "react-native";
import Card from "../ui/card";
import Row from "../ui/row";
import Text from "../ui/text";

export default function Info({ item }: { item: InvoiceOutput }) {
  const week = useMemo(() => {
    const { start, end } = generateWeekDuration(item.week, item.year);

    return `${formatedDateTime(start).date} မှ ${formatedDateTime(end).date} ထိ`;
  }, [item.week, item.year]);

  const { date, time } = useMemo(
    () => formatedDateTime(item.timestamp),
    [item.timestamp],
  );

  return (
    <>
      <View>
        <Text mode={"title"}>{item.name}</Text>
        <Text>စာရင်းအမှတ် #{item.id}</Text>
      </View>
      <Card>
        <Detail label={"ရက်စွဲ"} value={`${date} ${time}`} />
        <Detail label={"အပတ်စဥ်"} value={`${item.week} (${week})`} />
        {item.note && <Detail label={"မှတ်စု"} value={item.note} />}
      </Card>
    </>
  );
}

export const Detail = ({ label, value }: { label: string; value: string }) => (
  <Row>
    <Text style={{ flex: 1 }}>{label}</Text>
    <Text style={{ flex: 3 }}>{value}</Text>
  </Row>
);
