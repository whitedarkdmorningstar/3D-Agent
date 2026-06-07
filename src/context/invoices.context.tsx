import { DashboardInvoice } from "@/constants/invoice/schema";
import useDataList, { DataListHookOutput } from "@/hooks/use-data-list";
import useSelection, { SelectionHookOutput } from "@/hooks/use-selection";
import { usePathname } from "expo-router";
import { createContext, useContext, useEffect } from "react";

interface InvoicesDataList extends Omit<DataListHookOutput, "data"> {
  data: DashboardInvoice[];
}

interface ContextType extends InvoicesDataList, SelectionHookOutput {}

export const invoicesContext = createContext<ContextType | undefined>(
  undefined,
);

// Provider
export function InvoicesProvider({ children }: { children: React.ReactNode }) {
  const invoices = useDataList("invoices") as InvoicesDataList;
  const selection = useSelection();

  // reset selection on pathname change
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/invoices") {
      selection.resetSelection();
    }
  }, [pathname]);

  return (
    <invoicesContext.Provider value={{ ...invoices, ...selection }}>
      {children}
    </invoicesContext.Provider>
  );
}

// Hook
export function useInvoices() {
  const ctx = useContext(invoicesContext);

  if (!ctx) {
    throw new Error("useInvoices must be used within a InvoicesProvider");
  }

  return ctx;
}
