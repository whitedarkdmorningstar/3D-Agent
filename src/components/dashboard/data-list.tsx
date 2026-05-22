import { Customer, InvoiceOutput } from "@/constants/invoice/schema";
import { DataListHookOutput } from "@/hooks/use-data-list";
import { SelectionHookOutput } from "@/hooks/use-selection";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Legend from "../common/legend";
import Loading from "../common/loading";
import ListActions from "./list-actions";
import ListItem from "./list-item";
import SortData from "./sort-data";

const LIMIT = 10;

interface DataListProps extends DataListHookOutput, SelectionHookOutput {}

export default function DataList(props: DataListProps) {
  const renderItem = useCallback(
    ({ item, index }: { item: Customer | InvoiceOutput; index: number }) => (
      <ListItem
        item={item}
        key={index + item.name}
        isSelectMode={props.isSelectMode}
        selectedData={props.selectedData}
        toggleSelectItem={props.toggleSelectItem}
      />
    ),
    [props.selectedData, props.isSelectMode],
  );

  //Fix later
  const keyExtractor = useCallback(
    (item: Customer | InvoiceOutput, index: number) =>
      ("timestamp" in item ? item.timestamp.toString() : item.name) +
      index.toString(),
    [],
  );

  const Empty = useCallback(() => <Legend>စာရင်း မရှိပါ</Legend>, []);

  const Footer = useCallback(
    () =>
      props.isFetching ? (
        <Loading />
      ) : props.isEnded ? (
        <Legend>စာရင်းများ ကုန်ပါပြီ</Legend>
      ) : null,
    [props.isFetching, props.isEnded],
  );

  return (
    <>
      <SortData
        orderBy={props.orderBy}
        order={props.order}
        onChangeOrder={props.changeOrder}
        onChangeOrderBy={props.changeOrderBy}
      />
      <FlatList
        key={props.orderBy + props.order}
        ref={props.flatListRef}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props.fetchInitialData}
          />
        }
        contentContainerStyle={style.content}
        initialNumToRender={LIMIT}
        data={props.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={props.fetchMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
      <ListActions {...props} />
    </>
  );
}

const style = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
    gap: 2,
  },
});
