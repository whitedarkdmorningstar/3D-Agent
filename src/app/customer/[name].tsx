import CustomerInvoices from "@/components/customer/customer-invoices";
import Info from "@/components/customer/info";
import useCustomer from "@/components/customer/use-customer";
import Loading from "@/components/ui/loading";
import Main from "@/components/ui/main";
import Text from "@/components/ui/text";

export default function Customer() {
  const customer = useCustomer();

  if (customer.isLoading) return <Loading isScreen />;

  return (
    <Main isScrollable>
      <Text mode={"title"}>{customer.name} ၏ စာရင်းများ</Text>
      <Info />
      <CustomerInvoices {...customer} />
    </Main>
  );
}
