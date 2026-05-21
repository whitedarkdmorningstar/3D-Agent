import { InvoiceOutput } from "@/constants/invoice/schema";
import { fetchInvoiceAsync } from "@/database/read";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

interface InvoiceState extends InvoiceOutput {
  isLoading: boolean;
  error: string;
  isEditMode: boolean;
}

const initialState: InvoiceState = {
  id: 0,
  name: "",
  note: "",
  trashed: 0,
  timestamp: 0,
  created_at: 0,
  updated_at: 0,
  digit_names: "",
  digits: [],
  total_amount: 0,
  year: 0,
  week: 0,
  isLoading: true,
  error: "",
  isEditMode: false,
};

interface InvoiceHookOutput extends InvoiceState {
  moveToTrash: () => void;
  deleteForever: () => void;
  toggleEditMode: () => void;
}

export default function useInvoice(): InvoiceHookOutput {
  const [state, setState] = useState<InvoiceState>(initialState);
  const { id } = useLocalSearchParams();

  const fetchInvoice = useCallback(async (id: number) => {
    const result = await fetchInvoiceAsync(id);

    if (!result) {
      setState((prev) => ({
        ...prev,
        error: "အမှားတစ်စုံတစ်ရာ ဖြစ်ပေါ်ခဲ့သည်",
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      ...result,
      isLoading: false,
      error: "",
      isEditMode: false,
    }));
  }, []);

  // Fetch invoice data by id
  useEffect(() => {
    if (!id) {
      setState((prev) => ({
        ...prev,
        error: "အမှားတစ်စုံတစ်ရာ ဖြစ်ပေါ်ခဲ့သည်",
        isLoading: false,
      }));
      return;
    }

    fetchInvoice(Number(id));
  }, [id]);

  // Actions
  const moveToTrash = useCallback(() => {
    // TODO: alert user?
  }, []);

  const deleteForever = useCallback(() => {}, []);

  const toggleEditMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isEditMode: !prev.isEditMode,
    }));
  }, []);

  return {
    ...state,
    moveToTrash,
    deleteForever,
    toggleEditMode,
  };
}
