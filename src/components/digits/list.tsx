import { Digit } from "@/constants/invoice/schema";
import { numberWithCommas } from "@/utils/numbers";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Legend from "../ui/legend";
import ListItem from "../ui/list-item";
import Loading from "../ui/loading";
import DigitsSortData from "./sort-data";
import useDigits from "./use-digits";

const LIMIT = 10;

export default function DigitsList() {
  const digits = useDigits();
  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: Digit }) => (
      <ListItem
        title={item.digit}
        subtitle={numberWithCommas(item.total_amount) + " ကျပ်"}
        icon={"chevron-right"}
        onPress={() =>
          router.push({
            pathname: "/digit/[digit]",
            params: { digit: item.digit },
          })
        }
      />
    ),
    [router],
  );

  //Fix later
  const keyExtractor = useCallback(
    (item: Digit, index: number) => `${item.digit}${item.total_amount}`,
    [],
  );

  const Empty = useCallback(
    () =>
      digits.data.length === 0 &&
      !digits.isLoading && <Legend>စာရင်း မရှိပါ</Legend>,
    [digits.data, digits.isLoading],
  );

  const Footer = useCallback(
    () =>
      digits.data.length > 0 &&
      (digits.isFetching ? (
        <Loading />
      ) : digits.isEnded ? (
        <Legend>ဤမျှသာ</Legend>
      ) : null),
    [digits.isFetching, digits.isEnded, digits.data],
  );

  return (
    <>
      <FlatList
        key={digits.orderBy + digits.order}
        ref={digits.flatListRef}
        showsVerticalScrollIndicator
        refreshControl={
          <RefreshControl
            refreshing={digits.isLoading}
            onRefresh={digits.fetchInitialData}
          />
        }
        contentContainerStyle={style.content}
        initialNumToRender={LIMIT}
        data={digits.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={digits.fetchMoreData}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
      />
      <DigitsSortData {...digits} />
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
