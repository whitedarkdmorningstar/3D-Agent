import { DashboardInvoice } from "@/constants/invoice/schema";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Legend from "../ui/legend";
import Loading from "../ui/loading";
import ResultItem from "./result-item";
import { SearchHookOutput } from "./use-search";

const LIMIT = 10;

export default function ResultList(props: SearchHookOutput) {
  const renderItem = useCallback(
    ({ item }: { item: DashboardInvoice }) => <ResultItem item={item} />,
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
      props.query &&
      !props.isLoading &&
      props.results.length === 0 && <Legend>စာရင်း မရှိပါ</Legend>,
    [props.isLoading, props.results],
  );

  const Footer = useCallback(
    () =>
      props.results.length > 0 &&
      (props.isFetching ? (
        <Loading />
      ) : props.isEnded ? (
        <Legend>ဤမျှသာ</Legend>
      ) : null),
    [props.isFetching, props.isEnded, props.results],
  );

  return (
    <>
      <FlatList
        ref={props.flatListRef}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props.fetchInitialData}
          />
        }
        keyboardShouldPersistTaps={"always"}
        contentContainerStyle={style.content}
        initialNumToRender={LIMIT}
        data={props.results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={props.fetchMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
    </>
  );
}

const style = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 100,
    gap: 4,
  },
});
