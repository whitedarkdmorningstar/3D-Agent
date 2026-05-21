import { Order, OrderBy } from "@/constants/invoice/schema";
import { useSegments } from "expo-router";
import { useCallback, useState } from "react";
import { Menu, Text, ToggleButton } from "react-native-paper";
import Button from "../common/button";
import Card from "../common/card";
import Row from "../layout/row";

const orderByBurmese = {
  timestamp: { label: "ရက်စွဲ", icon: "calendar-clock" },
  name: { label: "အမည်", icon: "account" },
  digit_names: { label: "ဂဏန်း", icon: "numeric" },
  total_amount: { label: "ပမာဏ", icon: "cash" },
};

type OrderByKey = keyof typeof orderByBurmese;

type Props = {
  orderBy: OrderBy;
  order: Order;
  onChangeOrderBy: (orderBy: OrderBy) => void;
  onChangeOrder: (order: Order) => void;
};

export default function SortData(props: Props) {
  const [visible, setVisible] = useState(false);
  const isCustomerPath = useSegments()[0] === "customers";

  const closeMenu = useCallback(() => setVisible(false), []);

  const openMenu = useCallback(() => setVisible(true), []);

  const renderItem = useCallback(
    (item: OrderBy) => (
      <Menu.Item
        key={item}
        onPress={() => {
          props.onChangeOrderBy(item);
          closeMenu();
        }}
        leadingIcon={orderByBurmese[item as OrderByKey].icon}
        title={orderByBurmese[item as OrderByKey].label}
      />
    ),
    [props.onChangeOrderBy, closeMenu],
  );

  const Anchor = useCallback(
    () => (
      <Button
        mode={"contained"}
        onPress={openMenu}
        disabled={isCustomerPath}
        icon={"chevron-down"}
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        {orderByBurmese[props.orderBy as OrderByKey].label}
      </Button>
    ),
    [props.orderBy, isCustomerPath],
  );

  return (
    <Card
      style={{
        margin: 8,
        borderRadius: 100,
        paddingEnd: 8,
      }}
    >
      <Row
        justifyContent={"space-between"}
        style={{
          padding: 16,
          paddingVertical: 4,
        }}
      >
        {/**Hide Order By on Customers Screen */}
        <Row gap={8}>
          <Text>စီစဥ်ပုံ</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            style={{ marginTop: 4 }}
            anchor={<Anchor />}
          >
            {(Object.keys(orderByBurmese) as OrderBy[]).map(renderItem)}
          </Menu>
        </Row>

        <Row gap={8}>
          <Text>{props.order === "ASC" ? "ငယ်စဥ်ကြီး" : "ကြီးစဥ်ငယ်"}</Text>

          <Row>
            <ToggleButton
              value="ASC"
              icon={"sort-ascending"}
              onPress={() => props.onChangeOrder("ASC")}
              status={props.order === "ASC" ? "checked" : "unchecked"}
            />
            <ToggleButton
              value="DESC"
              icon={"sort-descending"}
              onPress={() => props.onChangeOrder("DESC")}
              status={props.order === "DESC" ? "checked" : "unchecked"}
            />
          </Row>
        </Row>
      </Row>
    </Card>
  );
}
