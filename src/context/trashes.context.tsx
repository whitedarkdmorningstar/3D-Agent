import { DashboardInvoice } from "@/constants/invoice/schema";
import useDataList, { DataListHookOutput } from "@/hooks/use-data-list";
import useSelection, { SelectionHookOutput } from "@/hooks/use-selection";
import { usePathname } from "expo-router";
import { createContext, useContext, useEffect } from "react";

interface TrashesDataList extends Omit<DataListHookOutput, "data"> {
  data: DashboardInvoice[];
}

interface ContextType extends TrashesDataList, SelectionHookOutput {}

export const trashesContext = createContext<ContextType | undefined>(undefined);

// Provider
export function TrashesProvider({ children }: { children: React.ReactNode }) {
  const trashes = useDataList("trash") as TrashesDataList;
  const selection = useSelection();

  // reset selection on pathname change
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/trashes") {
      selection.resetSelection();
    }
  }, [pathname]);

  return (
    <trashesContext.Provider value={{ ...trashes, ...selection }}>
      {children}
    </trashesContext.Provider>
  );
}

// Hook
export function useTrashes() {
  const ctx = useContext(trashesContext);

  if (!ctx) {
    throw new Error("useTrashes must be used within a TrashesProvider");
  }

  return ctx;
}
