import { DashboardInvoice } from "@/constants/invoice/schema";
import { Week, Year } from "@/constants/settings/schema";
import { useSettings } from "@/context/settings.context";
import { searchCustomerAsync, SqliteReadOptions } from "@/database/read";
import { useFocusEffect } from "expo-router";
import { RefObject, useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";

export interface SearchState {
  results: DashboardInvoice[];
  offset: number;
  isLoading: boolean;
  isFetching: boolean;
  isEnded: boolean;
  error: string;
}

const initialState: SearchState = {
  results: [],
  offset: 0,
  isLoading: false,
  isFetching: false,
  isEnded: false,
  error: "",
};

export interface SearchHookOutput extends SearchState {
  onChangeQuery: (query: string) => void;
  fetchInitialData: () => Promise<void>;
  fetchMoreData: () => Promise<void>;
  flatListRef: RefObject<FlatList<any> | null>;
  scrollToTop: () => void;
  query: string;
}

export function useSearch(): SearchHookOutput {
  const [state, setState] = useState<SearchState>(initialState);
  const [query, setQuery] = useState<string>("");
  const { year, week } = useSettings();

  const onChangeQuery = useCallback((query: string) => setQuery(query), []);

  // Fetch data
  const fetchDataAysnc = useCallback(
    async (
      query: string,
      year: Year,
      week: Week,
      offset: number = 0,
      initialFetch: boolean = true,
    ) => {
      if (query.length < 2) {
        setState((prev) => ({
          ...prev,
          results: [],
          isLoading: false,
          isFetching: false,
          isEnded: false,
          offset: 0,
          error: "",
        }));

        return;
      }

      const options: Partial<SqliteReadOptions> = {
        year,
        week,
        offset,
      };
      const data = await searchCustomerAsync(query, options);

      const dataLength = data.length;

      setState((prev) => ({
        ...prev,
        results: initialFetch ? data : [...prev.results, ...data],
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
    await fetchDataAysnc(query, year, week, 0, true);
  }, [year, week, query]);

  const fetchMoreData = useCallback(async () => {
    if (state.isLoading || state.isFetching || state.isEnded)
      return console.log("Still fetching");

    setState((prev) => ({ ...prev, isFetching: true }));

    await fetchDataAysnc(query, year, week, state.offset, false);
  }, [
    query,
    year,
    week,
    state.offset,
    state.isLoading,
    state.isFetching,
    state.isEnded,
  ]);

  // Scroll to top
  const flatListRef = useRef<FlatList>(null);

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (query.trim().length > 1) {
        fetchDataAysnc(query, year, week, 0, true);
      } else {
        setState((prev) => ({ ...prev, results: [] }));
      }
    }, [query, year, week]),
  );

  return {
    ...state,
    query,
    onChangeQuery,
    fetchInitialData,
    fetchMoreData,
    flatListRef,
    scrollToTop,
  };
}
