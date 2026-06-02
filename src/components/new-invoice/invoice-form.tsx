import { InvoiceDigit } from "@/constants/invoice/schema";
import { useCallback } from "react";
import Button from "../ui/button";
import Row from "../ui/row";
import Section from "../ui/section";
import TextInput from "../ui/text-input";
import DigitForm from "./invoice-digit-form";
import { useNewInvoice } from "./use-new-invoice";

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
    <Section style={{ gap: 16 }}>
      <TextInput
        ref={invoice.nameRef}
        value={invoice.name}
        left={"အမည်"}
        onChangeText={invoice.onNameChange}
      />
      {/**Mapping invoice digits */}
      {invoice.digits.map(renderItem)}

      <Row justifyContent="space-between">
        <Button
          icon={"reload"}
          variant={"secondary"}
          onPress={invoice.addRoundDigits}
        >
          လှည့်
        </Button>

        <Button
          icon={"add"}
          onPress={invoice.addNewDigit}
          variant={"secondary"}
        >
          ဂဏန်းအသစ်
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

      <Button
        loading={invoice.isLoading}
        onPress={invoice.handleSubmit}
        disabled={invoice.isLoading || Boolean(invoice.error)}
      >
        {invoice.isLoading ? "ပြေစာ ဖန်တီးနေသည် ..." : "ပြေစာ ဖန်တီးမည်"}
      </Button>
    </Section>
  );
}
