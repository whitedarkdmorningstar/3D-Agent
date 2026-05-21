import Card from "@/components/common/card";
import Actions from "@/components/invoice/actions";
import DigitTable from "@/components/invoice/digit-table";
import Main from "@/components/layout/main";
import useInvoice from "@/hooks/use-invoice";
import { formatedDateTime } from "@/utils/date-formats";

export default function Invoice() {
  const invoice = useInvoice();

  return (
    <Main isScrollable>
      <Card.Title
        title={invoice.name}
        subtitle={formatedDateTime(invoice.timestamp).date}
      />

      <DigitTable digits={invoice.digits} total_amount={invoice.total_amount} />

      <Actions
        toggleEditMode={invoice.toggleEditMode}
        deleteForever={invoice.deleteForever}
        moveToTrash={invoice.moveToTrash}
      />
    </Main>
  );
}
