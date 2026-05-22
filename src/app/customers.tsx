import DataList from "@/components/dashboard/data-list";
import useDataList from "@/hooks/use-data-list";
import useSelection from "@/hooks/use-selection";

export default function Customers() {
  const customerData = useDataList("customers");
  const selection = useSelection();

  return <DataList {...customerData} {...selection} />;
}
