import { InvoiceDigit, InvoiceOutput } from "@/constants/invoice/schema";
import { numberWithCommas } from "@/utils/numbers";
import { useCallback } from "react";
import { DataTable } from "react-native-paper";
import Card from "../common/card";

interface DigitTableProps {
  digits: InvoiceOutput["digits"];
  total_amount: InvoiceOutput["total_amount"];
}

export default function DigitTable({ digits, total_amount }: DigitTableProps) {
  const renderItem = useCallback(
    (digit: InvoiceDigit, index: number) => (
      <DataTable.Row
        key={index}
        style={{
          backgroundColor: index % 2 === 0 ? undefined : "rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataTable.Cell>{index + 1}</DataTable.Cell>
        <DataTable.Cell>{digit.digit}</DataTable.Cell>
        <DataTable.Cell numeric>{digit.amount}</DataTable.Cell>
      </DataTable.Row>
    ),
    [],
  );

  return (
    <Card>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{ fontSize: 16 }}>စဥ်</DataTable.Title>
          <DataTable.Title textStyle={{ fontSize: 16 }}>Digit</DataTable.Title>
          <DataTable.Title textStyle={{ fontSize: 16 }} numeric>
            ပမာဏ
          </DataTable.Title>
        </DataTable.Header>

        {digits.map(renderItem)}

        <DataTable.Row style={{ borderBottomWidth: 0 }}>
          <DataTable.Title textStyle={{ fontSize: 16 }}>
            စုစုပေါင်း
          </DataTable.Title>
          <DataTable.Title> </DataTable.Title>
          <DataTable.Title textStyle={{ fontSize: 16 }} numeric>
            {numberWithCommas(total_amount)} ကျပ်
          </DataTable.Title>
        </DataTable.Row>
      </DataTable>
    </Card>
  );
}
