import { Customer, InvoiceOutput } from "@/constants/invoice/schema";
import useTheme from "@/hooks/use-theme";
import { formatedDateTime } from "@/utils/date-formats";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { List } from "react-native-paper";
import Card from "../common/card";

export default function ListItem({
  item,
  isSelectMode,
  toggleSelectItem,
  selectedData = new Set(),
}: {
  item: Customer | InvoiceOutput;
  isSelectMode?: boolean;
  toggleSelectItem?: (item: string) => void;
  selectedData?: Set<string>;
}) {
  const route = useRouter();
  const { colors } = useTheme();

  const date = useMemo(
    () =>
      "timestamp" in item ? formatedDateTime(item.timestamp).date : undefined,
    [item],
  );

  const Right = useCallback(
    (props: any) =>
      isSelectMode ? (
        <List.Icon
          color={
            selectedData.has(item.name) ? colors.primary : colors.secondary
          }
          icon={
            selectedData.has(item.name)
              ? "checkbox-marked"
              : "checkbox-blank-outline"
          }
        />
      ) : (
        <List.Icon {...props} icon={"chevron-right"} />
      ),
    [isSelectMode, selectedData],
  );

  const handlePress = useCallback(() => {
    if (isSelectMode) {
      // Toggle selection
      toggleSelectItem?.(item.name);
    } else {
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
      );
    }
  }, [isSelectMode, item, route]);

  return (
    <Card>
      <List.Item
        contentStyle={{ minHeight: 48 }}
        title={
          "total_amount" in item
            ? `${item.name} (${item.total_amount} ကျပ်)`
            : `${item.name}`
        }
        description={date}
        right={Right}
        onPress={handlePress}
      />
    </Card>
  );
}
