import { InvoiceOutput } from "@/constants/invoice/schema";
import { useSettings } from "@/context/settings.context";
import { fetchInvoicesOfACustomerAsync } from "@/database/read";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export interface CustomerState {
  isLoading: boolean;
  error: "";
  data: InvoiceOutput[];
  name: string;
}

const initialState: CustomerState = {
  data: [],
  isLoading: true,
  error: "",
  name: "",
};

export default function useCustomer() {
  const [state, setState] = useState<CustomerState>(initialState);
  const name = useLocalSearchParams().name as string;
  const { year, week } = useSettings();

  const fetchCustomer = useCallback(async (name: string) => {
    const data = await fetchInvoicesOfACustomerAsync(name, { year, week });

    setState((prev) => ({
      ...prev,
      data,
      name,
      isLoading: false,
      error: "",
    }));
  }, []);

  useEffect(() => {
    // Fetch data
    fetchCustomer(name);
  }, [name]);

  return { ...state };
}
