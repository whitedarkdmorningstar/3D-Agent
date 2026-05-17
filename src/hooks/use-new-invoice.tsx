import { Invoice, InvoiceDigit, ThreeDigit } from "@/constants/invoice/schema";
import { getId, getRoundDigits } from "@/utils/numbers";
import { RefObject, useCallback, useRef, useState } from "react";
import { TextInput } from "react-native";

interface StateType extends Invoice {
  isLoading: boolean;
  error: string;
}

const initialDigit: InvoiceDigit = {
  digit_id: getId(),
  digit: "---" as ThreeDigit,
  amount: 0,
};

const initialState: StateType = {
  name: "",
  digits: [initialDigit],
  total_amount: 0,
  note: "",
  isLoading: false, // Ture when writing to sqlite
  error: "",
};

interface NewInvoiceHook extends StateType {
  nameRef: RefObject<TextInput | null>;
  addNewDigit: () => void;
  addRoundDigits: () => void;
  removeDigit: (id: string) => void;
  changeDigit: (invoiceDigit: Partial<InvoiceDigit>) => void;
  focusNameInput: () => void;
  handleSubmit: () => Promise<void>;
}

export function useNewInvoice(): NewInvoiceHook {
  const [state, setState] = useState<StateType>(initialState);

  // Add/Remove new digit
  const addNewDigit = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        digits: [
          ...prev.digits,
          { digit_id: getId(), digit: "---" as ThreeDigit, amount: 0 },
        ],
      })),
    [],
  );

  const removeDigit = useCallback(
    (id: string) =>
      setState((prev) => ({
        ...prev,
        digits: prev.digits.filter(({ digit_id }) => id !== digit_id),
        isError: "",
      })),
    [],
  );

  const changeDigit = useCallback(
    (invoiceDigit: Partial<InvoiceDigit>) =>
      setState((prev) => ({
        ...prev,
        digits: prev.digits.map((digit) =>
          digit.digit_id === invoiceDigit.digit_id
            ? { ...digit, ...invoiceDigit }
            : digit,
        ),
        isError: "",
      })),
    [],
  );

  const addRoundDigits = useCallback(() => {
    if (state.digits.length === 0) return;

    if (state.digits[0].digit === "---") return;

    // Get round digits of last digit
    const roundDigits = getRoundDigits(
      state.digits[state.digits.length - 1].digit,
    );
    setState((prev) => ({
      ...prev,
      digits: [
        ...prev.digits,
        ...roundDigits.map((digit) => ({
          digit_id: getId(),
          digit,
          amount: 0,
        })),
      ],
    }));
  }, [state.digits]);

  // Focus input
  const nameRef = useRef<TextInput>(null);

  const focusNameInput = useCallback(
    () => nameRef.current && nameRef.current.focus(),
    [],
  );

  const handleSubmit = useCallback(async () => {}, []);

  return {
    ...state,
    nameRef,
    addNewDigit,
    addRoundDigits,
    removeDigit,
    changeDigit,
    focusNameInput,
  };
}
