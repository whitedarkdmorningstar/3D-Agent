import CustomerTable from "@/components/digit/customer-table";
import Main from "@/components/ui/main";
import Text from "@/components/ui/text";
import { DigitOutput, ThreeDigit } from "@/constants/invoice/schema";
import { useSettings } from "@/context/settings.context";
import { fetchInvoicesOfADigitAsync } from "@/database/read";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function Digit() {
  const [state, setState] = useState<{
    invoices: DigitOutput[];
    isLoading: boolean;
  }>({
    invoices: [],
    isLoading: true,
  });
  const digit = useLocalSearchParams().digit as ThreeDigit;
  const { year, week } = useSettings();

  const fetchInitialData = useCallback(async () => {
    const invoices = await fetchInvoicesOfADigitAsync(digit, {
      year,
      week,
    });

    setState((prev) => ({
      ...prev,
      invoices,
      isLoading: false,
      error: "",
    }));
  }, [year, week, digit]);

  useEffect(() => {
    fetchInitialData();
  }, [digit]);

  return (
    <Main isScrollable>
      <Text>{digit} ဂဏန်း၏ စာရင်းများ</Text>
      <CustomerTable invoices={state.invoices} isLoading={state.isLoading} />
    </Main>
  );
}
