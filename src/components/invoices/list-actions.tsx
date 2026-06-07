import { useInvoices } from "@/context/invoices.context";
import { useRouter } from "expo-router";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";

export default function InvoicesListActions() {
  const invoices = useInvoices();
  const router = useRouter();

  return (
    <Row>
      {/* <IconButton
        name={"magnify"}
        onPress={() => router.push("/search-digit")}
      /> */}
      <IconButton
        disabled={invoices.data.length === 0}
        name={invoices.isSelectMode ? "close" : "pencil"}
        onPress={invoices.toggleSelectMode}
      />
    </Row>
  );
}
