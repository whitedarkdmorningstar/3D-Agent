import { useTrashes } from "@/context/trashes.context";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import Button from "../ui/button";
import DropDown from "../ui/dropdown";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";

const orderOptions = [
  { label: "ရက်စွဲ", value: "timestamp" },
  { label: "အမည်", value: "name" },
  { label: "ဂဏန်း", value: "digit_names" },
  { label: "ပမာဏ", value: "total_amount" },
  // { label: "ဖန်တီးသည့် ရက်စွဲ", value: "created_at" },
  // { label: "ပြင်ဆင်သည့် ရက်စွဲ", value: "updated_at" },
];

const nativeOrderOptions = {
  timestamp: "ရက်စွဲ",
  name: "အမည်",
  digit_names: "ဂဏန်း",
  total_amount: "ပမာဏ",
  created_at: "ဖန်တီးသည့် ရက်စွဲ",
  updated_at: "ပြင်ဆင်သည့် ရက်စွဲ",
};

export default function TrashesSortData() {
  const trashes = useTrashes();
  const router = useRouter();

  const handleMoveToTrash = useCallback(() => {
    router.push({
      // TODO:
      pathname: "/modals/trashes-confirm-modal",
      params: { list: "trashes" },
    });
  }, [router]);

  if (trashes.data.length === 0) return null;

  return (
    <>
      <Row justifyContent={"space-between"} style={styles.sort}>
        <DropDown
          options={orderOptions}
          selectedValue={trashes.orderBy}
          onValueChange={trashes.changeOrderBy as any}
          icon={"menu-down"}
          size={16}
          reverse
        >
          {
            nativeOrderOptions[
              trashes.orderBy as keyof typeof nativeOrderOptions
            ]
          }
        </DropDown>

        <Button
          icon={trashes.order === "ASC" ? "arrow-up" : "arrow-down"}
          onPress={trashes.toggleOrder}
        >
          {trashes.order === "ASC" ? "ငယ်စဥ်ကြီးလိုက်" : "ကြီးစဥ်ငယ်လိုက်"}
        </Button>
      </Row>
      {trashes.isSelectMode && (
        <IconButton
          disabled={trashes.selectedData.size === 0}
          style={styles.delete}
          fab
          name={"delete"}
          onPress={handleMoveToTrash}
          variant={"error"}
        />
      )}
      <IconButton
        fab
        style={styles.up}
        name={"arrow-up"}
        onPress={trashes.scrollToTop}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sort: {
    position: "absolute",
    top: 0,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 4,
  },
  delete: {
    position: "absolute",
    bottom: 24,
    start: 24,
  },
  up: {
    position: "absolute",
    bottom: 24,
    end: 24,
  },
});
