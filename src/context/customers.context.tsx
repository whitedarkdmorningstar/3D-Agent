import { Customer, Order, OrderBy } from "@/constants/invoice/schema";
import { Week, Year } from "@/constants/settings/schema";
import { fetchCustomersAsync, SqliteReadOptions } from "@/database/read";
import {
  DataList,
  initialState as initialDataList,
} from "@/hooks/use-data-list";
import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FlatList } from "react-native";
import { useSettings } from "./settings.context";

interface CustomersDataList extends Omit<DataList, "data"> {
  data: Customer[];
}

const initialState: CustomersDataList = {
  ...initialDataList,
  orderBy: "name",
  order: "ASC",
};

interface ContextType extends CustomersDataList {
  fetchInitialData: () => Promise<void>;
  fetchMoreData: () => Promise<void>;
  removeFromList: (names: string[]) => void;
  toggleOrder: () => void;
  flatListRef: RefObject<FlatList<any> | null>;
  scrollToTop: () => void;
}

export const customersContext = createContext<ContextType | undefined>(
  undefined,
);

// Provider
export function CustomersProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CustomersDataList>(initialState);
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
      const data = await fetchCustomersAsync(options);

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
    if (state.isLoading || state.isFetching || state.isEnded) return;

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
  const removeFromList = useCallback((names: string[]) => {
    setState((prev) => ({
      ...prev,
      data: prev.data.filter((item: Customer) => !names.includes(item.name)),
    }));
  }, []);

  const toggleOrder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      order: prev.order === "ASC" ? "DESC" : "ASC",
      isLoading: true,
    }));
  }, []);

  // Fetch Data
  useEffect(() => {
    fetchDataAysnc(year, week, state.orderBy, state.order);
  }, [year, week, state.orderBy, state.order]);

  // Scroll to top
  const flatListRef = useRef<FlatList>(null);

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  const value = {
    ...state,
    flatListRef,
    scrollToTop,
    fetchInitialData,
    fetchMoreData,
    removeFromList,
    toggleOrder,
  };

  return (
    <customersContext.Provider value={value}>
      {children}
    </customersContext.Provider>
  );
}

// Hook
export function useCustomers() {
  const ctx = useContext(customersContext);

  if (!ctx) {
    throw new Error("useCustomers must be used within a CustomersProvider");
  }

  return ctx;
}
