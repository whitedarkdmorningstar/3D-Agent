import useTheme from "@/hooks/use-theme";
import debounce from "debounce";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../ui/icon";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";
import TextInput from "../ui/text-input";

export default function SearchInput({
  onChangeQuery,
}: {
  onChangeQuery: (query: string) => void;
}) {
  const router = useRouter();
  const inset = useSafeAreaInsets().top;
  const { colors } = useTheme();

  const debounceChange = useMemo(() => debounce(onChangeQuery, 300), []);

  return (
    <Row
      style={{
        paddingTop: inset + 8,
        padding: 8,
        paddingEnd: 16,
        backgroundColor: colors.card,
        elevation: 2,
      }}
    >
      <IconButton name={"arrow-left"} size={25} onPress={router.back} />
      <TextInput
        autoFocus
        height={44}
        style={{ flex: 1 }}
        placeholder={"Search"}
        right={<Icon name={"magnify"} />}
        onChangeText={debounceChange}
      />
    </Row>
  );
}
