import { DigitOutput, Number, ThreeDigit } from "@/constants/invoice/schema";
import { useSettings } from "@/context/settings.context";
import { fetchInvoicesOfADigitAsync } from "@/database/read";
import { replaceDigit } from "@/utils/invoice";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export interface DigitState {
  invoices: DigitOutput[];
  isLoading: boolean;
  error: "";
  digit: ThreeDigit;
}

const initialState: DigitState = {
  invoices: [],
  isLoading: true,
  error: "",
  digit: "555" as ThreeDigit,
};

export interface DigitHookOutput extends DigitState {
  handleDigitChange: (number: Number, index: 0 | 1 | 2) => void;
}

export default function useDigit(): DigitHookOutput {
  const [state, setState] = useState<DigitState>(initialState);
  const { year, week } = useSettings();
  const params = useLocalSearchParams() as { digit: ThreeDigit };

  const handleDigitChange = useCallback((number: Number, index: 0 | 1 | 2) => {
    // Change digit after blur
    setState((prev) => ({
      ...prev,
      digit: replaceDigit(prev.digit, number, index),
      isLoading: true,
    }));
  }, []);

  const fetchInitialData = useCallback(async () => {
    const invoices = await fetchInvoicesOfADigitAsync(
      params.digit || state.digit,
      {
        year,
        week,
      },
    );

    setState((prev) => ({
      ...prev,
      invoices,
      isLoading: false,
      error: "",
    }));
  }, [year, week, state.digit, params]);

  useFocusEffect(
    useCallback(() => {
      fetchInitialData();
    }, [fetchInitialData]),
  );

  return { ...state, handleDigitChange };
}
