import { InvoiceDigit } from "@/constants/invoice/schema";
import { useNewInvoice } from "@/hooks/use-new-invoice";
import { useCallback } from "react";
import { List } from "react-native-paper";
import Alert from "../common/alert";
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

      <TextInput
        ref={invoice.nameRef}
        value={invoice.name}
        left={"အမည်"}
        onChangeText={invoice.onNameChange}
      />

      {/**Mapping invoice digits */}
      {invoice.digits.map(renderItem)}

      <Row justifyContent="space-between">
        <Button mode={"contained-tonal"} onPress={invoice.addRoundDigits}>
          R
        </Button>

        <Button
          icon={"plus"}
          mode={"contained-tonal"}
          onPress={invoice.addNewDigit}
        >
          New Digit
        </Button>
      </Row>
      <TextInput
        multiline
        placeholder="မှတ်စု (ဥပမာ - ရှင်းပြီး။ ကျန်ငွေ မည်မျှ)"
        numberOfLines={4}
        height={120}
        textInputStyle={{ textAlignVertical: "top" }}
        value={invoice.note}
        onChangeText={invoice.onNoteChange}
      />
      <Alert title={invoice.error} />
      <Button
        loading={invoice.isLoading}
        onPress={invoice.handleSubmit}
        disabled={invoice.isLoading || Boolean(invoice.error)}
      >
        {invoice.isLoading ? "ပြေစာ ဖန်တီးနေသည် ..." : "ပြေစာ ဖန်တီးမည်"}
      </Button>
    </List.Section>
  );
}
