import { DashboardInvoice } from "@/constants/invoice/schema";
import { useInvoices } from "@/context/invoices.context";
import useTheme from "@/hooks/use-theme";
import { formatedDateTime } from "@/utils/date-formats";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import ListItem from "../ui/list-item";

export default function InvoicesItem({ item }: { item: DashboardInvoice }) {
  const router = useRouter();
  const invoices = useInvoices();

  const date = useMemo(
    () => formatedDateTime(item.timestamp).date,
    [item.timestamp],
  );

  const iconName = useMemo(
    () =>
      invoices.isSelectMode
        ? invoices.selectedData.has(item.id)
          ? "checkbox-marked"
          : "checkbox-blank-outline"
        : "chevron-right",
    [invoices.isSelectMode, invoices.selectedData, item.id],
  );

  const { colors } = useTheme();

  const color = useMemo(
    () =>
      invoices.isSelectMode && invoices.selectedData.has(item.id)
        ? colors.primary
        : colors.text,
    [invoices.isSelectMode, invoices.selectedData, colors, item.id],
  );

  const onPress = useCallback(
    () =>
      invoices.isSelectMode
        ? invoices.toggleSelectItem(item.id)
        : router.push({
            pathname: "/invoice/[id]",
            params: { id: item.id },
          }),
    [invoices.isSelectMode, invoices.toggleSelectItem, item.id, router],
  );

  const onLongPress = useCallback(() => {
    // if it is in select mode, just toggle
    if (invoices.isSelectMode) {
      invoices.toggleSelectItem(item.id);
    } else {
      // Add current item into selected list
      // Toggle select mode
      invoices.itemLongPress(item.id);
    }
  }, [invoices.itemLongPress, item.id, invoices.toggleSelectItem]);

  return (
    <ListItem
      title={item.name}
      subtitle={item.digit_names}
      description={date}
      icon={iconName}
      color={color}
      onPress={onPress}
      onLongPress={onLongPress}
    />
  );
}
