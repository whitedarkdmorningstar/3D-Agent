import ListRoutes from "@/components/dashboard/list-routes";
import Summary from "@/components/dashboard/summary";
import { useDashboard } from "@/components/dashboard/use-dashboard";
import Divider from "@/components/ui/divider";
import Main from "@/components/ui/main";
import { seedRandomDataAsync } from "@/database/create";
import { useEffect } from "react";

export default function Screen() {
  const { invoices, trash, customers } = useDashboard();

  // TODO: Remove this on production
  useEffect(() => {
    seedRandomDataAsync(0);
  }, []);

  return (
    <Main isScrollable>
      <ListRoutes />
      <Divider />
      <Summary />
      {/* <ItemList title={"ဂဏန်းများ"} data={[]} href={"/digits"} />
      <Divider />
      <ItemList title={"စာရင်းများ"} data={invoices} href={"/invoices"} />
      <Divider />
      <ItemList title={"စျေးဝယ်များ"} data={customers} href={"/customers"} />
      <Divider />
      <ItemList title={"အမှိုက်ပုံး"} data={trash} href={"/trashes"} /> */}
    </Main>
  );
}
