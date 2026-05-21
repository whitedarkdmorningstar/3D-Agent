import { Customer, DashboardInvoice } from "@/constants/invoice/schema";
import { fetchCustomersAsync, fetchInvoicesAsync } from "@/database/read";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import useSettings from "./use-settings";

type DashboardState = {
  invoices: DashboardInvoice[];
  customers: Customer[];
  isLoading: boolean;
  error: string;
};

interface DashboardOutput extends DashboardState {}

const initialState: DashboardState = {
  invoices: [],
  customers: [],
  isLoading: true,
  error: "",
};

export default function useDashboard(): DashboardOutput {
  const [state, setState] = useState<DashboardState>(initialState);
  const { year, week, limit } = useSettings();

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const invoices = await fetchInvoicesAsync({ year, week, limit });
      const customers = await fetchCustomersAsync({ year, week, limit });

      setTimeout(
        () => setState({ invoices, customers, isLoading: false, error: "" }),
        500,
      );
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "An error occurred",
      }));
    }
  }, [year, week, limit]);

  // Fetch data on mount and every time the component is focused
  useFocusEffect(() => {
    fetchData();
  });

  return { ...state };
}
