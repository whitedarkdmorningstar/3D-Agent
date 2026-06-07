import { InvoiceDigit, InvoiceOutput } from "@/constants/invoice/schema";
import useTheme from "@/hooks/use-theme";
import { numberWithCommas } from "@/utils/numbers";
import { useCallback } from "react";
import Card from "../ui/card";
import Row from "../ui/row";
import Text from "../ui/text";

interface DigitTableProps {
  digits: InvoiceOutput["digits"];
  total_amount: InvoiceOutput["total_amount"];
}

export default function DigitTable({ digits, total_amount }: DigitTableProps) {
  const renderItem = useCallback(
    (digit: InvoiceDigit, index: number) => (
      <TableRow
        key={digit.digit_id}
        no={index + 1}
        digit={digit.digit}
        amount={digit.amount}
      />
    ),
    [],
  );

  return (
    <Card>
      <TableRow no={"စဥ်"} digit={"ဂဏန်း"} amount={"ပမာဏ (ကျပ်)"} />

      {digits.map(renderItem)}

      <TableRow no={""} digit={"စုစုပေါင်း"} amount={total_amount} noBorder />
    </Card>
  );
}

export const TableRow = ({
  no,
  digit,
  amount,
  noBorder,
}: {
  no: number | string;
  digit: string;
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
      <Text style={{ flex: 1, textAlign: "left" }}>{digit}</Text>
      <Text style={{ flex: 1, textAlign: "right" }}>
        {typeof amount === "number" ? numberWithCommas(amount) : amount}
      </Text>
    </Row>
  );
};
