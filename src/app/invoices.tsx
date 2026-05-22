import DataList from "@/components/dashboard/data-list";
import useDataList from "@/hooks/use-data-list";
import useSelection from "@/hooks/use-selection";

export default function Invoices() {
  const customerData = useDataList("invoices");
  const selection = useSelection();

  return <DataList {...customerData} {...selection} />;
}
