import DataList from "@/components/dashboard/data-list";
import useDataList from "@/hooks/use-data-list";

export default function Invoices() {
  const invoiceData = useDataList("invoices");

  return <DataList {...invoiceData} />;
}
