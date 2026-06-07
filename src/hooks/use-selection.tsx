import { DashboardInvoice } from "@/constants/invoice/schema";
import { deleteInvoicePermanentlyAsync } from "@/database/delete";
import { moveInvoiceToTrashAsync } from "@/database/update";
import { useCallback, useState } from "react";

type Selection = {
  isSelectMode: boolean;
  selectedData: Set<number>;
  isSelectedAll: boolean;
};

const initialSelection: Selection = {
  isSelectMode: false,
  selectedData: new Set<number>(),
  isSelectedAll: false,
};

export interface SelectionHookOutput extends Selection {
  toggleSelectItem: (item: number) => void;
  toggleSelectMode: () => void;
  moveSelectedToTrash: () => void;
  toggleSelectAll: () => void;
  deleteSelectedPermanently: () => void;
  itemLongPress: (id: number) => void;
  resetSelection: () => void;
}

export default function useSelection(
  data: DashboardInvoice[] = [],
): SelectionHookOutput {
  // Selection
  const [state, setState] = useState<Selection>(initialSelection);

  const toggleSelectMode = useCallback(
    () =>
      setState((prev) => ({
        isSelectedAll: false,
        isSelectMode: !prev.isSelectMode,
        selectedData: new Set(),
      })),
    [],
  );

  const toggleSelectItem = useCallback((id: number) => {
    setState((prev) => {
      const newSet = new Set(prev.selectedData);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return { ...prev, selectedData: newSet };
    });
  }, []);

  const itemLongPress = useCallback((id: number) => {
    setState((prev) => {
      return {
        ...prev,
        isSelectMode: true,
        selectedData: new Set([id]),
      };
    });
  }, []);

  const moveSelectedToTrash = useCallback(async () => {
    // Update trashed to 1
    const ids = [...state.selectedData];

    for (const id of ids) {
      await moveInvoiceToTrashAsync(id);
    }

    // Clean out selected items
    setState(initialSelection);

    // Re-fetch dashboard data
  }, [state.selectedData]);

  // Delete the selected items forever
  // Then, refresh dashboard data
  const deleteSelectedPermanently = useCallback(async () => {
    // Update trashed to 1
    const ids = [...state.selectedData];

    for (const id of ids) {
      await deleteInvoicePermanentlyAsync(id);
    }

    // Clean out selected items
    setState(initialSelection);
  }, [state.selectedData]);

  // Select all option is only for 'trash' route
  const toggleSelectAll = useCallback(() => {
    setState((prev) => ({
      isSelectMode: true,
      isSelectedAll: !prev.isSelectedAll,
      selectedData: prev.isSelectedAll
        ? new Set()
        : new Set(data.map((e) => e.id)),
    }));
  }, [data]);

  // reset selection
  const resetSelection = useCallback(() => {
    setState(initialSelection);
  }, []);

  return {
    ...state,
    toggleSelectItem,
    toggleSelectMode,
    moveSelectedToTrash,
    toggleSelectAll,
    deleteSelectedPermanently,
    itemLongPress,
    resetSelection,
  };
}
