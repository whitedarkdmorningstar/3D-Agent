import DataList from "@/components/dashboard/data-list";
import useDataList from "@/hooks/use-data-list";

export default function Customers() {
  const customerData = useDataList("customers");

  return <DataList {...customerData} />;
}
