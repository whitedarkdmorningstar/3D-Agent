import { Customer, DashboardInvoice } from "@/constants/invoice/schema";
import { formatedDateTime } from "@/utils/date-formats";
import { Href, useRouter } from "expo-router";
import { useCallback } from "react";
import Button from "../ui/button";
import Legend from "../ui/legend";
import ListItem from "../ui/list-item";
import Loading from "../ui/loading";
import Section from "../ui/section";

interface ItemListProps {
  title: string;
  href?: Href;
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
      <ListItem
        title={item.name}
        subtitle={"timestamp" in item ? item.digit_names : undefined}
        description={
          "timestamp" in item
            ? formatedDateTime(item.timestamp).date
            : undefined
        }
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
        icon={"chevron-right"}
        key={index.toString() + item.name}
      />
    ),
    [],
  );

  return (
    <Section
      title={title}
      right={
        href ? (
          <Button
            reverse
            icon={"chevron-right"}
            onPress={() => route.push(href)}
          >
            အပြည့်အစုံကြည့်ရန်
          </Button>
        ) : null
      }
    >
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          {Boolean(data.length) ? (
            data.map(renderItem)
          ) : (
            <Legend>စာရင်း မရှိပါ</Legend>
          )}
        </>
      )}
    </Section>
  );
}
