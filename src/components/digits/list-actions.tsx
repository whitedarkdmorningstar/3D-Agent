import { useRouter } from "expo-router";
import IconButton from "../ui/icon-button";

export default function DigitsListActions() {
  const router = useRouter();

  return (
    <IconButton name={"magnify"} onPress={() => router.push("/search-digit")} />
  );
}
