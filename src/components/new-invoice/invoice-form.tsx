import { InvoiceDigit } from "@/constants/invoice/schema";
import { useNewInvoice } from "@/hooks/use-new-invoice";
import { useCallback } from "react";
import { List } from "react-native-paper";
import Button from "../common/button";
import TextInput from "../common/text-input";
import Row from "../layout/row";
import DigitForm from "./invoice-digit-form";

export default function InvoiceForm() {
  const invoice = useNewInvoice();

  const renderItem = useCallback(
    (item: InvoiceDigit, index: number) => (
      <DigitForm
        key={item.digit_id}
        index={index}
        showClose={invoice.digits.length > 1}
        {...item}
        focusNameInput={index === 0 ? invoice.focusNameInput : undefined}
        removeDigit={invoice.removeDigit}
        changeDigit={invoice.changeDigit}
      />
    ),
    [
      invoice.changeDigit,
      invoice.removeDigit,
      invoice.focusNameInput,
      invoice.digits,
    ],
  );

  return (
    <List.Section style={{ gap: 16 }}>
      <List.Subheader>ပြေစာ</List.Subheader>

      <TextInput ref={invoice.nameRef} left={"အမည်"} />

      {/**Mapping invoice digits */}
      {invoice.digits.map(renderItem)}

      <Row justifyContent="space-between">
        <Button
          icon={"plus"}
          mode={"contained-tonal"}
          onPress={invoice.addRoundDigits}
        >
          ADD ROUND
        </Button>

        <Button
          icon={"plus"}
          mode={"contained-tonal"}
          onPress={invoice.addNewDigit}
        >
          Add New
        </Button>
      </Row>
      <TextInput
        multiline
        placeholder="မှတ်စု (ဥပမာ - ရှင်းပြီး< ကျန်ငွေ မည်မျှ)"
        numberOfLines={4}
        height={100}
        textInputStyle={{ textAlignVertical: "top" }}
      />
      <Button loading={invoice.isLoading}>
        {invoice.isLoading ? "ပြေစာ ဖန်တီးနေသည် ..." : "ပြေစာ ဖန်တီးမည်"}
      </Button>
    </List.Section>
  );
}
