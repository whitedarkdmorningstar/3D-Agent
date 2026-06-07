import { Customer } from "@/constants/invoice/schema";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import ListItem from "../ui/list-item";

export default function CustomersItem({ item }: { item: Customer }) {
  const router = useRouter();

  const onPress = useCallback(
    () =>
      router.push({
        pathname: "/customer/[name]",
        params: { name: item.name },
      }),
    [item.name, router],
  );

  return (
    <ListItem title={item.name} icon={"chevron-right"} onPress={onPress} />
  );
}
