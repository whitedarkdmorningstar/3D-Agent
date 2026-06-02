import { Customer, DashboardInvoice } from "@/constants/invoice/schema";
import { Limit, Week, Year } from "@/constants/settings/schema";
import { useSettings } from "@/context/settings.context";
import { fetchCustomersAsync, fetchInvoicesAsync } from "@/database/read";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

type DashboardState = {
  invoices: DashboardInvoice[];
  customers: Customer[];
  trash: DashboardInvoice[];
  isLoading: boolean;
  error: string;
};

const initialState: DashboardState = {
  invoices: [],
  customers: [],
  trash: [],
  isLoading: true,
  error: "",
};

export function useDashboard() {
  const [state, setState] = useState<DashboardState>(initialState);
  const { year, week, limit } = useSettings();

  const fetchData = useCallback(
    async (year: Year, week: Week, limit: Limit) => {
      setState((prev) => ({ ...prev, isLoading: true }));

      const options = { year, week, limit };

      try {
        const invoices = await fetchInvoicesAsync(options);
        const customers = await fetchCustomersAsync(options);
        const trash = await fetchInvoicesAsync({ ...options, trashed: 1 });

        setState({ invoices, customers, trash, isLoading: false, error: "" });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "An error occurred",
        }));
      }
    },
    [],
  );

  // Fetch data on mount and every time the component is focused
  useFocusEffect(
    useCallback(() => {
      fetchData(year, week, limit);
    }, [fetchData, year, week, limit]),
  );

  return { ...state };
}
