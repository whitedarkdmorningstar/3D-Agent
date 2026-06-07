import { useRouter } from "expo-router";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";

export default function ListRoutes() {
  const router = useRouter();

  const iconSize = 150;

  return (
    <>
      <Row>
        <IconButton
          style={{ flex: 1, borderWidth: 4 }}
          shape={"rounded"}
          name={"numeric"}
          variant={"primary"}
          size={iconSize}
          onPress={() => router.push("/digits")}
        />
        <IconButton
          style={{ flex: 1, borderWidth: 4 }}
          shape={"rounded"}
          name={"list-box-outline"}
          size={iconSize}
          variant={"success"}
          onPress={() => router.push("/invoices")}
        />
      </Row>
      <Row>
        <IconButton
          style={{ flex: 1, borderWidth: 4 }}
          shape={"rounded"}
          name={"account"}
          variant={"warning"}
          size={iconSize}
          onPress={() => router.push("/customers")}
        />
        <IconButton
          style={{ flex: 1, borderWidth: 4 }}
          shape={"rounded"}
          name={"delete-variant"}
          variant={"error"}
          size={iconSize}
          onPress={() => router.push("/trashes")}
        />
      </Row>
    </>
  );
}
