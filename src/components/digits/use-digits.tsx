import { Digit, Order } from "@/constants/invoice/schema";
import { Week, Year } from "@/constants/settings/schema";
import { useSettings } from "@/context/settings.context";
import { DigitOptions, fetchDigitsAsync } from "@/database/read";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

type OrderBy = "digit" | "total_amount";

export type DataList = {
  data: Digit[];
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
  orderBy: "digit",
  order: "DESC",
  error: "",
};

export interface DigitstHookOutput extends DataList {
  fetchInitialData: () => Promise<void>;
  fetchMoreData: () => Promise<void>;
  toggleOrder: () => void;
  changeOrderBy: (orderBy: OrderBy) => void;
  flatListRef: RefObject<FlatList<any> | null>;
  scrollToTop: () => void;
}

export default function useDigits(): DigitstHookOutput {
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
      const options: Partial<DigitOptions> = {
        year,
        week,
        orderBy,
        order,
        offset,
      };
      const data = await fetchDigitsAsync(options);

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
    toggleOrder,
    changeOrderBy,
  };
}
