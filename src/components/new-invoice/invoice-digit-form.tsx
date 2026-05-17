import { ThreeDigit } from "@/constants/invoice/schema";
import useNewInvoiceDigit, {
  NewInvoiceDigitProps,
} from "@/hooks/use-new-invoice-digit";
import React, { forwardRef } from "react";
import { TextInput as RNTextInput, TextInputKeyPressEvent } from "react-native";
import { IconButton, Text } from "react-native-paper";
import TextInput from "../common/text-input";
import Row from "../layout/row";

interface InvoiceDigitFormProps extends NewInvoiceDigitProps {
  index: number;
  showClose: boolean;
}

export default function InvoiceDigitForm(props: InvoiceDigitFormProps) {
  const {
    firstRef,
    secondRef,
    thirdRef,
    amountRef,
    onChangeFirst,
    onChangeSecond,
    onChangeThird,
    onChangeAmount,
    onAmountPress,
    removeDigit,
  } = useNewInvoiceDigit(props);

  return (
    <Row gap={16}>
      <Text>{props.index + 1}.</Text>
      <Row gap={2} style={{ flex: 1 }}>
        <NumberInput
          ref={firstRef}
          digit={props.digit}
          index={0}
          onKeyPress={onChangeFirst}
        />
        <NumberInput
          ref={secondRef}
          digit={props.digit}
          index={1}
          onKeyPress={onChangeSecond}
        />
        <NumberInput
          ref={thirdRef}
          digit={props.digit}
          index={2}
          onKeyPress={onChangeThird}
        />
      </Row>
      <TextInput
        ref={amountRef}
        value={props.amount.toString()}
        style={{ flex: 1 }}
        keyboardType={"numeric"}
        onChangeText={onChangeAmount}
        onKeyPress={onAmountPress}
        textInputStyle={{ textAlign: "right" }}
        right={"ကျပ်"}
      />
      {props.showClose && <IconButton icon={"close"} onPress={removeDigit} />}
    </Row>
  );
}

const NumberInput = forwardRef<
  RNTextInput,
  {
    digit: ThreeDigit;
    index: 0 | 1 | 2;
    onKeyPress: (e: TextInputKeyPressEvent) => void;
  }
>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      keyboardType={"numeric"}
      textInputStyle={{ textAlign: "center" }}
      style={{ flex: 1 }}
      value={Boolean(props.digit) ? props.digit.charAt(props.index) : "-"}
      onKeyPress={props.onKeyPress}
    />
  );
});
