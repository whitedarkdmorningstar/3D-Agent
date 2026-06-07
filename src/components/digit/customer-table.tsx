import { DigitOutput } from "@/constants/invoice/schema";
import useTheme from "@/hooks/use-theme";
import { numberWithCommas } from "@/utils/numbers";
import { useCallback, useMemo } from "react";
import Card from "../ui/card";
import Legend from "../ui/legend";
import Loading from "../ui/loading";
import Row from "../ui/row";
import Text from "../ui/text";

interface CustomerTableProps {
  invoices: DigitOutput[];
  isLoading: boolean;
}

export default function CustomerTable({
  invoices,
  isLoading,
}: CustomerTableProps) {
  const renderItem = useCallback(
    (invoices: DigitOutput, index: number) => (
      <TableRow
        key={index}
        no={index + 1}
        name={invoices.name}
        amount={invoices.amount}
      />
    ),
    [],
  );

  const totalAmount = useMemo(
    () => invoices.reduce((total, invoice) => total + invoice.amount, 0),
    [invoices],
  );

  if (isLoading) return <Loading />;

  if (invoices.length === 0) return <Legend>စာရင်း မရှိပါ</Legend>;

  return (
    <Card>
      <TableRow no={"စဥ်"} name={"အမည်"} amount={"ပမာဏ (ကျပ်)"} />

      {invoices.map(renderItem)}

      <TableRow no={""} name={"စုစုပေါင်း"} amount={totalAmount} noBorder />
    </Card>
  );
}

export const TableRow = ({
  no,
  name,
  amount,
  noBorder,
}: {
  no: number | string;
  name: string;
  amount: number | string;
  noBorder?: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <Row
      style={{
        padding: 8,
        borderBottomWidth: noBorder ? 0 : 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ textAlign: "center", width: 40 }}>{no}</Text>
      <Text style={{ flex: 1, textAlign: "left" }}>{name}</Text>
      <Text style={{ flex: 1, textAlign: "right" }}>
        {typeof amount === "number" ? numberWithCommas(amount) : amount}
      </Text>
    </Row>
  );
};
