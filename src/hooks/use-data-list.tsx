import { DashboardInvoice, Order, OrderBy } from "@/constants/invoice/schema";
import { Week, Year } from "@/constants/settings/schema";
import { useSettings } from "@/context/settings.context";
import { fetchInvoicesAsync, SqliteReadOptions } from "@/database/read";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

export type DataList = {
  data: DashboardInvoice[];
  offset: number;
  isLoading: boolean;
  isFetching: boolean;
  isEnded: boolean;
  orderBy: OrderBy;
  order: Order;
  error: "";
};

export const initialState: DataList = {
  data: [],
  offset: 0,
  isLoading: true,
  isFetching: false,
  isEnded: false,
  orderBy: "timestamp",
  order: "DESC",
  error: "",
};

export interface DataListHookOutput extends DataList {
  fetchInitialData: () => Promise<void>;
  fetchMoreData: () => Promise<void>;
  removeFromList: (ids: number[]) => void;
  cleanList: () => void;
  toggleOrder: () => void;
  changeOrderBy: (orderBy: OrderBy) => void;
  flatListRef: RefObject<FlatList<any> | null>;
  scrollToTop: () => void;
}

export type ListName = "invoices" | "trash";

export default function useDataList(listName: ListName): DataListHookOutput {
  const [state, setState] = useState<DataList>(initialState);
  const { year, week } = useSettings();

  // Fetch data
  const fetchDataAysnc = useCallback(
    async (
      year: Year,
      week: Week,
      orderBy: OrderBy,
      order: Order,
      offset: number = 0,
      initialFetch: boolean = true,
    ) => {
      const options: Partial<SqliteReadOptions> = {
        year,
        week,
        orderBy,
        order,
        offset,
      };
      const data =
        listName === "invoices"
          ? await fetchInvoicesAsync(options)
          : await fetchInvoicesAsync({ ...options, trashed: 1 });

      const dataLength = data.length;

      setState((prev) => ({
        ...prev,
        data: initialFetch ? data : [...prev.data, ...data],
        isLoading: false,
        isFetching: false,
        isEnded: dataLength === 0,
        offset: initialFetch ? dataLength : prev.offset + dataLength,
        error: "",
      }));
    },
    [],
  );

  const fetchInitialData = useCallback(async () => {
    await fetchDataAysnc(year, week, state.orderBy, state.order, 0, true);
  }, [year, week, state.orderBy, state.order]);

  const fetchMoreData = useCallback(async () => {
    if (state.isLoading || state.isFetching || state.isEnded)
      return console.log("Still fetching");

    setState((prev) => ({ ...prev, isFetching: true }));

    await fetchDataAysnc(
      year,
      week,
      state.orderBy,
      state.order,
      state.offset,
      false,
    );
  }, [
    year,
    week,
    state.orderBy,
    state.order,
    state.offset,
    state.isLoading,
    state.isFetching,
    state.isEnded,
  ]);

  // To delete item
  const removeFromList = useCallback((ids: number[]) => {
    setState((prev) => ({
      ...prev,
      data: prev.data.filter(
        (item: DashboardInvoice) => !ids.includes(item.id),
      ),
    }));
  }, []);

  // To clean the list
  const cleanList = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        data: [],
        isEnded: true,
        isFetching: false,
        isLoading: false,
      })),
    [],
  );

  const toggleOrder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      order: prev.order === "ASC" ? "DESC" : "ASC",
      isLoading: true,
    }));
  }, []);

  const changeOrderBy = useCallback(
    (orderBy: OrderBy) => {
      if (state.orderBy === orderBy) return;

      setState((prev) => ({ ...prev, orderBy, isLoading: true }));
    },
    [state.data],
  );

  // Fetch Data
  useEffect(() => {
    fetchDataAysnc(year, week, state.orderBy, state.order);
  }, [year, week, state.orderBy, state.order]);

  // Scroll to top
  const flatListRef = useRef<FlatList>(null);

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  return {
    ...state,
    flatListRef,
    scrollToTop,
    fetchInitialData,
    fetchMoreData,
    removeFromList,
    toggleOrder,
    changeOrderBy,
    cleanList,
  };
}
