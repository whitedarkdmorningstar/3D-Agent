import { useCallback, useState } from "react";

type Selection = {
  isSelectMode: boolean;
  selectedData: Set<string>;
};

const initialSelection: Selection = {
  isSelectMode: false,
  selectedData: new Set<string>(),
};

export interface SelectionHookOutput extends Selection {
  toggleSelectItem: (item: string) => void;
  toggleSelectMode: () => void;
  moveSelectedToTrash: () => void;
}

export default function useSelection(): SelectionHookOutput {
  // Selection
  const [state, setState] = useState<Selection>(initialSelection);

  const toggleSelectMode = useCallback(
    () => setState((prev) => ({ ...prev, isSelectMode: !prev.isSelectMode })),
    [],
  );

  const toggleSelectItem = useCallback((item: string) => {
    setState((prev) => {
      const newSet = new Set(prev.selectedData);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return { ...prev, selectedData: newSet };
    });
  }, []);

  const moveSelectedToTrash = useCallback(() => {
    // update
    // Clean out selected items
    setState(initialSelection);
  }, []);

  return { ...state, toggleSelectItem, toggleSelectMode, moveSelectedToTrash };
}
