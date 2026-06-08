import ListRoutes from "@/components/dashboard/list-routes";
import Summary from "@/components/dashboard/summary";
import Divider from "@/components/ui/divider";
import Main from "@/components/ui/main";

export default function Screen() {
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
