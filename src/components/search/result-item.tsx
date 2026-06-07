import { DashboardInvoice } from "@/constants/invoice/schema";
import { formatedDateTime } from "@/utils/date-formats";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import ListItem from "../ui/list-item";

export default function ResultItem({ item }: { item: DashboardInvoice }) {
  const router = useRouter();

  const date = useMemo(
    () => formatedDateTime(item.timestamp).date,
    [item.timestamp],
  );

  const onPress = useCallback(
    () => router.push({ pathname: "/invoice/[id]", params: { id: item.id } }),
    [item.id, router],
  );

  return (
    <ListItem
      title={item.name}
      subtitle={item.digit_names}
      description={date}
      onPress={onPress}
      icon={"chevron-right"}
    />
  );
}
