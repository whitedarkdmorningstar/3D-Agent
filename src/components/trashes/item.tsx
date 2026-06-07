import { DashboardInvoice } from "@/constants/invoice/schema";
import { useTrashes } from "@/context/trashes.context";
import useTheme from "@/hooks/use-theme";
import { formatedDateTime } from "@/utils/date-formats";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import ListItem from "../ui/list-item";

export default function TrashItem({ item }: { item: DashboardInvoice }) {
  const router = useRouter();
  const trashes = useTrashes();

  const date = useMemo(
    () => formatedDateTime(item.timestamp).date,
    [item.timestamp],
  );

  const iconName = useMemo(
    () =>
      trashes.isSelectMode
        ? trashes.selectedData.has(item.id)
          ? "checkbox-marked"
          : "checkbox-blank-outline"
        : "chevron-right",
    [trashes.isSelectMode, trashes.selectedData, item.id],
  );

  const { colors } = useTheme();

  const color = useMemo(
    () =>
      trashes.isSelectMode && trashes.selectedData.has(item.id)
        ? colors.primary
        : colors.text,
    [trashes.isSelectMode, trashes.selectedData, colors, item.id],
  );

  const onPress = useCallback(
    () =>
      trashes.isSelectMode
        ? trashes.toggleSelectItem(item.id)
        : router.push({
            pathname: "/invoice/[id]",
            params: { id: item.id },
          }),
    [trashes.isSelectMode, trashes.toggleSelectItem, item.id, router],
  );

  const onLongPress = useCallback(() => {
    // if it is in select mode, just toggle
    if (trashes.isSelectMode) {
      trashes.toggleSelectItem(item.id);
    } else {
      // Add current item into selected list
      // Toggle select mode
      trashes.itemLongPress(item.id);
    }
  }, [trashes.itemLongPress, item.id, trashes.toggleSelectItem]);

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
