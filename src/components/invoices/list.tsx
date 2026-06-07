import { DashboardInvoice } from "@/constants/invoice/schema";
import { useInvoices } from "@/context/invoices.context";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Legend from "../ui/legend";
import Loading from "../ui/loading";
import InvoicesItem from "./item";
import InvoicesSortData from "./sort-data";

const LIMIT = 10;

export default function InvoicesList() {
  const invoices = useInvoices();

  const renderItem = useCallback(
    ({ item }: { item: DashboardInvoice }) => <InvoicesItem item={item} />,
    [],
  );

  //Fix later
  const keyExtractor = useCallback(
    (item: DashboardInvoice, index: number) =>
      `${item.digit_names}${item.total_amount}${item.id}`,
    [],
  );

  const Empty = useCallback(
    () =>
      invoices.data.length === 0 &&
      !invoices.isLoading && <Legend>စာရင်း မရှိပါ</Legend>,
    [invoices.data, invoices.isLoading],
  );

  const Footer = useCallback(
    () =>
      invoices.data.length > 0 &&
      (invoices.isFetching ? (
        <Loading />
      ) : invoices.isEnded ? (
        <Legend>ဤမျှသာ</Legend>
      ) : null),
    [invoices.isFetching, invoices.isEnded, invoices.data],
  );

  return (
    <>
      <FlatList
        key={invoices.orderBy + invoices.order}
        ref={invoices.flatListRef}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={invoices.isLoading}
            onRefresh={invoices.fetchInitialData}
          />
        }
        contentContainerStyle={style.content}
        initialNumToRender={LIMIT}
        data={invoices.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={invoices.fetchMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
      <InvoicesSortData />
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
