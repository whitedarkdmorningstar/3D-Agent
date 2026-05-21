import { Customer, DashboardInvoice } from "@/constants/invoice/schema";
import { Href, useRouter } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import Button from "../common/button";
import Legend from "../common/legend";
import Loading from "../common/loading";
import ListItem from "./list-item";

interface ItemListProps {
  title: string;
  href: Href;
  data: DashboardInvoice[] | Customer[];
  isLoading?: boolean;
}

export default function ItemList({
  title,
  href,
  data,
  isLoading,
}: ItemListProps) {
  const route = useRouter();

  const renderItem = useCallback(
    (item: DashboardInvoice | Customer, index: number) => (
      <ListItem item={item} key={index.toString() + item.name} />
    ),
    [],
  );

  const openLink = useCallback(() => route.push(href), [href]);

  return (
    <List.Section>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <List.Subheader onPress={openLink}>{title}</List.Subheader>
        <Button
          icon={"chevron-right"}
          contentStyle={{ flexDirection: "row-reverse" }}
          onPress={openLink}
        >
          အပြည့်အစုံကြည့်ရန်
        </Button>
      </View>

      {isLoading === true ? (
        <Loading />
      ) : (
        <View style={{ gap: 2, marginTop: 8 }}>
          {Boolean(data.length) ? data.map(renderItem) : <ListEmptyComponent />}
        </View>
      )}
    </List.Section>
  );
}

const ListEmptyComponent = () => <Legend>မည်သည့် စာရင်းမှ ‌မတွေ့ပါ</Legend>;
