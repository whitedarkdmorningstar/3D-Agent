import { Customer, InvoiceOutput } from "@/constants/invoice/schema";
import { DataListHookOutput } from "@/hooks/use-data-list";
import { useCallback, useRef } from "react";
import { FlatList, RefreshControl } from "react-native";
import Legend from "../common/legend";
import ListActions from "./list-actions";
import ListItem from "./list-item";
import SortData from "./sort-data";

const LIMIT = 10;

interface DataListProps extends DataListHookOutput {}

export default function DataList(props: DataListProps) {
  const renderItem = useCallback(
    ({ item, index }: { item: Customer | InvoiceOutput; index: number }) => (
      <ListItem item={item} key={index + item.name} />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Customer | InvoiceOutput, index: number) => index.toString(),
    [],
  );

  const Empty = useCallback(() => <Legend>မည်သည့် စာရင်းမှ မရှိပါ</Legend>, []);

  const Footer = useCallback(
    () =>
      props.isFetching ? (
        <Legend>စာရင်းများ ထပ်မံ ရယူနေသည်</Legend>
      ) : props.isEnded ? (
        <Legend>စာရင်းများ ကုန်ပါပြီ</Legend>
      ) : null,
    [props.isFetching, props.isEnded],
  );

  // Scroll to top
  const ref = useRef<FlatList>(null);

  const scrollToTop = useCallback(() => {
    ref.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  return (
    <>
      <SortData
        orderBy={props.orderBy}
        order={props.order}
        onChangeOrder={props.changeOrder}
        onChangeOrderBy={props.changeOrderBy}
      />
      <FlatList
        ref={ref}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props.fetchInitialData}
          />
        }
        contentContainerStyle={{
          padding: 16,
          paddingTop: 0,
          paddingBottom: 100,
          gap: 2,
        }}
        initialNumToRender={LIMIT}
        data={props.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={props.fetchMoreData}
        onEndReachedThreshold={1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
      <ListActions />
    </>
  );
}
