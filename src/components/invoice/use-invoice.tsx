import { InvoiceOutput } from "@/constants/invoice/schema";
import { fetchInvoiceAsync } from "@/database/read";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

interface InvoiceState extends InvoiceOutput {
  loading: boolean;
  error: string;
  editMode: boolean;
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
  loading: true,
  error: "",
  editMode: false,
};

interface InvoiceHookOutput extends InvoiceState {
  toggleEditMode: () => void;
}

export default function useInvoice(): InvoiceHookOutput {
  const [state, setState] = useState<InvoiceState>(initialState);
  const id = Number(useLocalSearchParams().id);

  const fetchInvoice = useCallback(async (id: number) => {
    const result = await fetchInvoiceAsync(id);

    if (!result) {
      setState((prev) => ({
        ...prev,
        error: "အမှားတစ်စုံတစ်ရာ ဖြစ်ပေါ်ခဲ့သည်",
        loading: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      ...result,
      loading: false,
      error: "",
      editMode: false,
    }));
  }, []);

  // Fetch invoice data by id
  useEffect(() => {
    if (!id) {
      setState((prev) => ({
        ...prev,
        error: "အမှားတစ်စုံတစ်ရာ ဖြစ်ပေါ်ခဲ့သည်",
        loading: false,
      }));
      return;
    }

    fetchInvoice(Number(id));
  }, [id]);

  const toggleEditMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      editMode: !prev.editMode,
    }));
  }, []);

  return {
    ...state,
    toggleEditMode,
  };
}
