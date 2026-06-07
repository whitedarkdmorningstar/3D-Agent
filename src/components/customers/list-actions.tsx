import { useRouter } from "expo-router";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";

export default function CustomersListActions() {
  const router = useRouter();

  return (
    <Row>
      <IconButton
        name={"magnify"}
        onPress={() => router.push("/search-customer")}
      />
    </Row>
  );
}
