import {
  Invoice,
  InvoiceDigit,
  InvoiceInput,
  invoiceInputSchema,
  ThreeDigit,
} from "@/constants/invoice/schema";
import { insertInvoiceAsync } from "@/database/create";
import { getRoundDigits } from "@/utils/invoice";
import { getId } from "@/utils/numbers";
import { RefObject, useCallback, useRef, useState } from "react";
import { TextInput } from "react-native";
import { z } from "zod";
import useSettings from "./use-settings";

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
  note: "",
  isLoading: false, // Ture when writing to sqlite
  error: "",
};

interface NewInvoiceHook extends StateType {
  nameRef: RefObject<TextInput | null>;
  onNameChange: (name: string) => void;
  onNoteChange: (note: string) => void;
  addNewDigit: () => void;
  addRoundDigits: () => void;
  removeDigit: (id: string) => void;
  changeDigit: (invoiceDigit: Partial<InvoiceDigit>) => void;
  focusNameInput: () => void;
  handleSubmit: () => Promise<void>;
}

export function useNewInvoice(): NewInvoiceHook {
  const [state, setState] = useState<StateType>(initialState);

  // Handle name/note change
  const onNameChange = useCallback(
    (name: string) => setState((prev) => ({ ...prev, name, error: "" })),
    [],
  );

  const onNoteChange = useCallback(
    (note: string) => setState((prev) => ({ ...prev, note })),
    [],
  );

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
        error: "",
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
        error: "",
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

  // Get year and week from settings
  const { year, week } = useSettings();

  const handleSubmit = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: "" }));

    const invoiceInput: InvoiceInput = {
      name: state.name,
      digits: state.digits,
      note: state.note,
      year,
      week,
    };

    try {
      // validate invoice digits and invoice input
      invoiceInputSchema.parse(invoiceInput);

      const result = await insertInvoiceAsync(invoiceInput);

      // Reset form after submit
      if (result) {
        setTimeout(() => setState(initialState), 1000);
        focusNameInput();
      } else {
        // TODO: Handle error
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setState((prev) => ({
          ...prev,
          error: error.issues[0].message,
          isLoading: false,
        }));
      }
    }
  }, [year, week, state.digits, state.name, state.note]);

  return {
    ...state,
    nameRef,
    onNameChange,
    onNoteChange,
    addNewDigit,
    addRoundDigits,
    removeDigit,
    changeDigit,
    focusNameInput,
    handleSubmit,
  };
}
