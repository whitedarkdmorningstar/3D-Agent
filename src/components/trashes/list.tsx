import { DashboardInvoice } from "@/constants/invoice/schema";
import { useTrashes } from "@/context/trashes.context";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Legend from "../ui/legend";
import Loading from "../ui/loading";
import TrashItem from "./item";
import SortData from "./sort-data";

const LIMIT = 10;

export default function TrashesList() {
  const trashes = useTrashes();

  const renderItem = useCallback(
    ({ item }: { item: DashboardInvoice }) => <TrashItem item={item} />,
    [],
  );

  //Fix later
  const keyExtractor = useCallback(
    (item: DashboardInvoice, index: number) => item.timestamp.toString(),
    [],
  );

  const Empty = useCallback(() => <Legend>စာရင်း မရှိပါ</Legend>, []);

  const Footer = useCallback(
    () =>
      trashes.data.length > 0 &&
      (trashes.isFetching ? (
        <Loading />
      ) : trashes.isEnded ? (
        <Legend>စာရင်းများ ကုန်ပါပြီ</Legend>
      ) : null),
    [trashes.isFetching, trashes.isEnded, trashes.data],
  );

  return (
    <>
      <FlatList
        key={trashes.orderBy + trashes.order}
        ref={trashes.flatListRef}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={trashes.isLoading}
            onRefresh={trashes.fetchInitialData}
          />
        }
        contentContainerStyle={style.content}
        initialNumToRender={LIMIT}
        data={trashes.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={trashes.fetchMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
      <SortData />
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
