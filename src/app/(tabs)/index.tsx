import ItemList from "@/components/dashboard/item-list";
import { useDashboard } from "@/components/dashboard/use-dashboard";
import Main from "@/components/ui/main";

export default function Screen() {
  const { invoices } = useDashboard();

  return (
    <Main isScrollable>
      <ItemList title={"စာရင်းများ"} data={invoices} href={"/invoices"} />
    </Main>
  );
}
