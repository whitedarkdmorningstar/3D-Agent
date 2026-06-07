import { ThreeDigit } from "@/constants/invoice/schema";
import { useSettings } from "@/context/settings.context";
import { fetchSummaryAsync, SummaryOutput } from "@/database/read";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const initialState: SummaryOutput = {
  totalInvoice: 0,
  totalAmount: 0,
  nonEmptyDigits: 0,
  topCustomer: { name: "", amount: 0 },
  topDigit: { name: "---" as ThreeDigit, amount: 0 },
  frequentDigit: "---" as ThreeDigit,
  frequentCustomer: "",
};

export function useSummary(): SummaryOutput {
  const [state, setState] = useState<SummaryOutput>(initialState);
  const { year, week } = useSettings();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const summary = await fetchSummaryAsync({ year, week });
        setState(summary);
      };

      fetchData();
    }, []),
  );

  return { ...state };
}
