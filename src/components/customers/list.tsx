import { Customer } from "@/constants/invoice/schema";
import { useCustomers } from "@/context/customers.context";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Legend from "../ui/legend";
import Loading from "../ui/loading";
import CustomersItem from "./item";
import CustomersSortData from "./sort-data";

const LIMIT = 10;

export default function CustomersList() {
  const customers = useCustomers();

  const renderItem = useCallback(
    ({ item }: { item: Customer }) => <CustomersItem item={item} />,
    [],
  );

  //Fix later
  const keyExtractor = useCallback(
    (item: Customer, index: number) => item.name.toString(),
    [],
  );

  const Empty = useCallback(
    () =>
      !customers.isLoading &&
      customers.data.length === 0 && <Legend>စာရင်း မရှိပါ</Legend>,
    [customers.isLoading, customers.data],
  );

  const Footer = useCallback(
    () =>
      customers.data.length > 0 &&
      (customers.isFetching ? (
        <Loading />
      ) : customers.isEnded ? (
        <Legend>ဤမျှသာ</Legend>
      ) : null),
    [customers.isFetching, customers.isEnded, customers.data],
  );

  return (
    <>
      <FlatList
        key={customers.orderBy + customers.order}
        ref={customers.flatListRef}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={customers.isLoading}
            onRefresh={customers.fetchInitialData}
          />
        }
        contentContainerStyle={style.content}
        initialNumToRender={LIMIT}
        data={customers.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={customers.fetchMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
      <CustomersSortData />
    </>
  );
}

const style = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 68,
    paddingBottom: 100,
    gap: 4,
  },
});
