import Actions from "@/components/invoice/actions";
import DigitTable from "@/components/invoice/digit-table";
import Info from "@/components/invoice/info";
import useInvoice from "@/components/invoice/use-invoice";
import Main from "@/components/ui/main";

export default function Invoice() {
  const invoice = useInvoice();

  return (
    <Main isScrollable>
      <Info item={{ ...invoice }} />
      <DigitTable digits={invoice.digits} total_amount={invoice.total_amount} />
      <Actions {...invoice} trashed={invoice.trashed === 1} />
    </Main>
  );
}
