import { formatedDateTime } from "@/utils/date-formats";
import { numberWithCommas } from "@/utils/numbers";
import { useMemo } from "react";
import { View } from "react-native";
import DigitTable from "../invoice/digit-table";
import Accordion from "../ui/accordion";
import Alert from "../ui/alert";
import { CustomerState } from "./use-customer";

export default function CustomerInvoices(props: CustomerState) {
  const items = props.data.map((invoice, index) => ({
    title: `${index + 1}. စာရင်း #${invoice.id} (${formatedDateTime(invoice.timestamp).date})`,
    content: (
      <DigitTable digits={invoice.digits} total_amount={invoice.total_amount} />
    ),
    value: invoice.id,
  }));

  const total = useMemo(
    () =>
      numberWithCommas(
        props.data.reduce((total, invoice) => total + invoice.total_amount, 0),
      ),
    [props.data],
  );

  return (
    <>
      <Alert
        variant={"info"}
        name={"information-outline"}
        description={`စုစုပေါင်း - ${total} ကျပ်`}
      />
      <View>
        <Accordion items={items} defaultValue={[props.data[0].id]} />
      </View>
    </>
  );
}
