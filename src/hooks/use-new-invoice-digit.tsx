import {
  InvoiceDigit,
  numberSchema,
  ThreeDigit,
} from "@/constants/invoice/schema";
import { replaceDigit } from "@/utils/numbers";
import { RefObject, useCallback, useRef } from "react";
import { TextInput, TextInputKeyPressEvent } from "react-native";
import { z } from "zod";

export interface NewInvoiceDigitProps extends InvoiceDigit {
  changeDigit: (invoiceDigit: Partial<InvoiceDigit>) => void;
  focusNameInput?: () => void;
  removeDigit: (id: string) => void;
}

type NewInvoiceDigitHook = {
  firstRef: RefObject<TextInput | null>;
  secondRef: RefObject<TextInput | null>;
  thirdRef: RefObject<TextInput | null>;
  amountRef: RefObject<TextInput | null>;
  onChangeFirst: (e: TextInputKeyPressEvent) => void;
  onChangeSecond: (e: TextInputKeyPressEvent) => void;
  onChangeThird: (e: TextInputKeyPressEvent) => void;
  onChangeAmount: (value: string) => void;
  onAmountPress: (e: TextInputKeyPressEvent) => void;
  removeDigit: () => void;
};

export default function useNewInvoiceDigit({
  digit,
  digit_id,
  amount,
  changeDigit,
  focusNameInput,
  ...props
}: NewInvoiceDigitProps): NewInvoiceDigitHook {
  const firstRef = useRef<TextInput>(null);
  const secondRef = useRef<TextInput>(null);
  const thirdRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const handleDigitChange = useCallback(
    async (
      e: TextInputKeyPressEvent,
      digit: ThreeDigit,
      digit_id: string,
      index: 0 | 1 | 2,
    ) => {
      const value = e.nativeEvent.key;

      // If backspace is pressed
      if (value === "Backspace") {
        changeDigit({ digit: replaceDigit(digit, "-", index), digit_id });

        // Focus on previous textinput
        if (index === 0) {
          focusNameInput?.();
        } else if (index === 1) {
          firstRef.current && firstRef.current.focus();
        } else if (index === 2) {
          secondRef.current && secondRef.current.focus();
        }
      }

      // For non-number is pressed
      if (isNaN(Number(value))) return;

      try {
        // If input value is not a number nor the length is not 1,
        // We won't focus on next input
        numberSchema.parse(value);

        changeDigit({
          digit: replaceDigit(digit, value, index),
          digit_id,
        });

        // After typing one word, second digit input will be focused
        if (index === 0) {
          secondRef.current && secondRef.current.focus();
        } else if (index === 1) {
          thirdRef.current && thirdRef.current.focus();
        } else if (index === 2) {
          amountRef.current && amountRef.current.focus();
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(error.issues[0].message);
        }
      }
    },
    [changeDigit, focusNameInput],
  );

  const onChangeFirst = useCallback(
    (e: TextInputKeyPressEvent) => {
      handleDigitChange(e, digit, digit_id, 0);
    },
    [digit, digit_id],
  );

  const onChangeSecond = useCallback(
    (e: TextInputKeyPressEvent) => {
      handleDigitChange(e, digit, digit_id, 1);
    },
    [digit, digit_id],
  );

  const onChangeThird = useCallback(
    (e: TextInputKeyPressEvent) => {
      handleDigitChange(e, digit, digit_id, 2);
    },
    [digit, digit_id],
  );

  // handle amount change
  const onChangeAmount = useCallback(
    (value: string) => changeDigit({ digit_id, amount: Number(value) }),
    [changeDigit],
  );

  const onAmountPress = useCallback(
    (e: TextInputKeyPressEvent) => {
      if (e.nativeEvent.key === "Backspace" && amount === 0) {
        thirdRef.current && thirdRef.current.focus();
      }
    },
    [amount],
  );

  // Remove this digit
  const removeDigit = useCallback(
    () => props.removeDigit(digit_id),
    [digit_id],
  );

  return {
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
  };
}
