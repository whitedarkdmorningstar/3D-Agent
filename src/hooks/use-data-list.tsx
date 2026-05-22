import {
  Customer,
  InvoiceOutput,
  Order,
  OrderBy,
} from "@/constants/invoice/schema";
import { Week, Year } from "@/constants/settings/schema";
import { fetchCustomersAsync, fetchInvoicesAsync } from "@/database/read";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import useSettings from "./use-settings";

type DataList = {
  data: InvoiceOutput[] | Customer[];
  offset: number;
  isLoading: boolean;
  isFetching: boolean;
  isEnded: boolean;
  orderBy: OrderBy;
  order: Order;
  error: "";
};

const initialState: DataList = {
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
  fetchInitialData: () => void;
  fetchMoreData: () => void;
  changeOrder: (order: Order) => void;
  changeOrderBy: (orderBy: OrderBy) => void;
  flatListRef: RefObject<FlatList<any> | null>;
  scrollToTop: () => void;
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
  const fetchDataAysnc = useCallback(
    async (
      year: Year,
      week: Week,
      orderBy: OrderBy,
      order: Order,
      offset: number = 0,
      initialFetch: boolean = true,
    ) => {
      const data =
        listName === "invoices"
          ? await fetchInvoicesAsync({ year, week, orderBy, order, offset })
          : await fetchCustomersAsync({
              year,
              week,
              orderBy,
              order,
              offset,
              isRandom: false,
            });
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

  // Change order
  const changeOrder = useCallback(
    (order: Order) => {
      if (state.order === order) return;

      setState((prev) => ({ ...prev, order, isLoading: true }));
    },
    [state.order],
  );

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
    changeOrder,
    changeOrderBy,
  };
}
