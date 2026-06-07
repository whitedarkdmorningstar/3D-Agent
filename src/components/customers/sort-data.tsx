import { useCustomers } from "@/context/customers.context";
import { StyleSheet } from "react-native";
import Button from "../ui/button";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";

export default function CustomersSortData() {
  const customers = useCustomers();

  if (customers.data.length === 0) return null;

  return (
    <>
      <Row justifyContent={"flex-end"} style={styles.sort}>
        <Button
          icon={customers.order === "ASC" ? "arrow-up" : "arrow-down"}
          onPress={customers.toggleOrder}
        >
          {customers.order === "ASC" ? "ငယ်စဥ်ကြီးလိုက်" : "ကြီးစဥ်ငယ်လိုက်"}
        </Button>
      </Row>

      <IconButton
        fab
        style={styles.up}
        name={"arrow-up"}
        onPress={customers.scrollToTop}
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
