import {
  Customer,
  InvoiceOutput,
  Order,
  OrderBy,
} from "@/constants/invoice/schema";
import { Week, Year } from "@/constants/settings/schema";
import { fetchCustomersAsync, fetchInvoicesAsync } from "@/database/read";
import { useCallback, useEffect, useState } from "react";
import useSettings from "./use-settings";

type DataList = {
  data: InvoiceOutput[] | Customer[];
  isLoading: boolean;
  isFetching: boolean;
  isEnded: boolean;
  orderBy: OrderBy;
  order: Order;
  error: "";
  isSelectMode: boolean;
  selectedData: string[];
};

const initialState: DataList = {
  data: [],
  isLoading: true,
  isFetching: false,
  isEnded: false,
  orderBy: "timestamp",
  order: "DESC",
  error: "",
  isSelectMode: false,
  selectedData: [],
};

export interface DataListHookOutput extends DataList {
  fetchInitialData: () => void;
  fetchMoreData: () => void;
  changeOrder: (order: Order) => void;
  changeOrderBy: (orderBy: OrderBy) => void;
  toggleSelectMode: () => void;
  moveSelectedToTrash: () => void;
  toggleSelectItem: (item: Customer | InvoiceOutput) => void;
}

export type ListName = "invoices" | "customers";

export default function useDataList(listName: ListName): DataListHookOutput {
  const [state, setState] = useState<DataList>({
    ...initialState,
    orderBy: listName === "customers" ? "name" : "timestamp",
    order: listName === "customers" ? "ASC" : "DESC",
  });
  const { year, week } = useSettings();

  // Fetch data
  const fetchDataAsync = useCallback(
    async (
      listName: ListName,
      year: Year,
      week: Week,
      orderBy: OrderBy,
      order: Order,
      initialFetch: boolean = true,
    ) => {
      const option = { year, week, orderBy, order };

      if (initialFetch) {
        setState((prev) => ({ ...prev, isLoading: true }));
      } else {
        setState((prev) => ({ ...prev, isFetching: true }));
      }

      const data =
        listName === "invoices"
          ? await fetchInvoicesAsync(option)
          : await fetchCustomersAsync({ ...option, isRandom: false });

      setState((prev) => ({
        ...prev,
        data: initialFetch ? data : [...prev.data, ...data],
        isLoading: false,
        isFetching: false,
        isEnded: data.length === 0,
        error: "",
      }));
    },
    [],
  );

  const fetchInitialData = useCallback(async () => {
    fetchDataAsync(listName, year, week, state.orderBy, state.order);
  }, [listName, year, week, state.orderBy, state.order]);

  const fetchMoreData = useCallback(async () => {
    await fetchDataAsync(
      listName,
      year,
      week,
      state.orderBy,
      state.order,
      false,
    );
  }, [listName, year, week, state.orderBy, state.order]);

  // Initial fetch
  useEffect(() => {
    fetchDataAsync(listName, year, week, state.orderBy, state.order);
  }, []);

  // Change order, orderBy
  const changeOrder = useCallback(
    (order: Order) => {
      setState((prev) => ({ ...prev, order }));
      fetchDataAsync(listName, year, week, state.orderBy, order);
    },
    [listName, year, week, state.orderBy],
  );

  const changeOrderBy = useCallback(
    (orderBy: OrderBy) => {
      setState((prev) => ({ ...prev, orderBy }));
      fetchDataAsync(listName, year, week, orderBy, state.order);
    },
    [listName, year, week, state.order],
  );

  // Selection
  const toggleSelectMode = useCallback(
    () => setState((prev) => ({ ...prev, isSelectMode: !prev.isSelectMode })),
    [],
  );

  const toggleSelectItem = useCallback(
    (item: string) =>
      setState((prev) => ({
        ...prev,
        selectedData: prev.selectedData.includes(item)
          ? prev.selectedData.filter((i) => i !== item)
          : [...prev.selectedData, item],
      })),
    [],
  );

  const moveSelectedToTrash = useCallback(() => {
    // update
    // Clean out selected items
    setState((prev) => ({
      ...prev,
      selectedData: [],
      isSelectMode: false,
    }));
  }, []);

  return {
    ...state,
    fetchInitialData,
    fetchMoreData,
    changeOrder,
    changeOrderBy,
  };
}
