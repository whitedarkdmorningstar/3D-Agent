import { StyleSheet } from "react-native";
import Button from "../ui/button";
import DropDown from "../ui/dropdown";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";
import { DigitstHookOutput } from "./use-digits";

const orderOptions = [
  { label: "ဂဏန်း", value: "digit" },
  { label: "ပမာဏ", value: "total_amount" },
];

const nativeOrderOptions = {
  digit: "ဂဏန်း",
  total_amount: "ပမာဏ",
};

export default function DigitsSortData(props: DigitstHookOutput) {
  return (
    <>
      <Row justifyContent={"space-between"} style={styles.sort}>
        <DropDown
          options={orderOptions}
          selectedValue={props.orderBy}
          onValueChange={props.changeOrderBy as any}
          icon={"menu-down"}
          reverse
        >
          {nativeOrderOptions[props.orderBy as keyof typeof nativeOrderOptions]}
        </DropDown>

        <Button
          icon={props.order === "ASC" ? "arrow-up" : "arrow-down"}
          onPress={props.toggleOrder}
        >
          {props.order === "ASC" ? "ငယ်စဥ်ကြီးလိုက်" : "ကြီးစဥ်ငယ်လိုက်"}
        </Button>
      </Row>

      <IconButton
        fab
        style={styles.up}
        name={"arrow-up"}
        onPress={props.scrollToTop}
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
