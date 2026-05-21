import { Order, OrderBy } from "@/constants/invoice/schema";
import { useCallback, useState } from "react";
import { Card, Menu, Text, ToggleButton } from "react-native-paper";
import Button from "../common/button";
import Row from "../layout/row";

const orderByBurmese = {
  timestamp: "ရက်စွဲ",
  name: "အမည်",
  digit: "ဂဏန်း",
  amount: "ပမာဏ",
  created_at: "ဖန်တီးသည့်ရက်စွဲ",
  updated_at: "ပြင်ဆင်သည့်ရက်စွဲ",
};

type Props = {
  orderBy: OrderBy;
  order: Order;
  onChangeOrderBy: (orderBy: OrderBy) => void;
  onChangeOrder: (order: Order) => void;
};

export default function SortData(props: Props) {
  const [visible, setVisible] = useState(false);

  const closeMenu = useCallback(() => setVisible(false), []);

  const openMenu = useCallback(() => setVisible(true), []);

  const renderItem = useCallback(
    (item: OrderBy) =>
      item !== "created_at" &&
      item !== "updated_at" && (
        <Menu.Item
          key={item}
          onPress={() => {
            props.onChangeOrderBy(item);
            closeMenu();
          }}
          title={orderByBurmese[item as keyof typeof orderByBurmese]}
        />
      ),
    [props.onChangeOrderBy, closeMenu],
  );

  const Anchor = useCallback(
    () => (
      <Button
        mode={"contained"}
        onPress={openMenu}
        icon={"chevron-down"}
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        {orderByBurmese[props.orderBy as keyof typeof orderByBurmese]}
      </Button>
    ),
    [props.orderBy],
  );

  return (
    <Card style={{ marginVertical: 8, borderRadius: 100, paddingEnd: 8 }}>
      <Row
        justifyContent="space-between"
        style={{
          padding: 16,
          paddingVertical: 8,
        }}
      >
        <Row gap={8}>
          <Text>စီစဥ်ပုံ</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
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
