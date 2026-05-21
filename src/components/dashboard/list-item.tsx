import { Customer, InvoiceOutput } from "@/constants/invoice/schema";
import { formatedDateTime } from "@/utils/date-formats";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { List } from "react-native-paper";
import Card from "../common/card";

export default function ListItem({ item }: { item: Customer | InvoiceOutput }) {
  const route = useRouter();

  const date = useMemo(
    () =>
      "timestamp" in item ? formatedDateTime(item.timestamp).date : undefined,
    [item],
  );

  return (
    <Card>
      <List.Item
        title={
          "total_amount" in item
            ? `${item.name} (${item.total_amount} ကျပ်)`
            : `${item.name}`
        }
        description={date}
        right={(props) => <List.Icon {...props} icon={"chevron-right"} />}
        onPress={() =>
          route.push(
            "timestamp" in item
              ? {
                  pathname: "/invoice/[id]",
                  params: { id: item.id },
                }
              : {
                  pathname: "/customer/[name]",
                  params: { name: item.name },
                },
          )
        }
      />
    </Card>
  );
}
