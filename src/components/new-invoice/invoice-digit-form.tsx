import { ThreeDigit } from "@/constants/invoice/schema";
import { forwardRef } from "react";
import { TextInput as RNTextInput, TextInputKeyPressEvent } from "react-native";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";
import Text from "../ui/text";
import TextInput from "../ui/text-input";
import useNewInvoiceDigit, {
  NewInvoiceDigitProps,
} from "./use-new-invoice-digit";

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
      {props.showClose && <IconButton name={"close"} onPress={removeDigit} />}
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
      style={{ flex: 1, minWidth: 50 }}
      containerStyle={{ paddingHorizontal: 8 }}
      value={Boolean(props.digit) ? props.digit.charAt(props.index) : "-"}
      onKeyPress={props.onKeyPress}
    />
  );
});
