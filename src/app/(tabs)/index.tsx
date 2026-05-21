import ItemList from "@/components/dashboard/item-list";
import Main from "@/components/layout/main";
import useDashboard from "@/hooks/use-dashboard";

export default function Dashboard() {
  const { invoices, isLoading, customers } = useDashboard();

  return (
    <Main isScrollable>
      <ItemList
        title={"ယခုအပတ် စာရင်းများ"}
        href={"/invoices"}
        data={invoices}
        isLoading={isLoading}
      />
      <ItemList
        title={"စျေးဝယ်များ"}
        href={"/customers"}
        data={customers}
        isLoading={isLoading}
      />
    </Main>
  );
}
