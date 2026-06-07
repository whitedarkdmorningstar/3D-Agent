import { numberWithCommas } from "@/utils/numbers";
import Info from "../customer/info";
import Card from "../ui/card";
import Detail from "../ui/detail";
import Section from "../ui/section";
import { useSummary } from "./use-summary";

export default function Summary() {
  const summary = useSummary();

  if (summary.totalInvoice === 0) return null;

  return (
    <>
      <Section title={"အနှစ်ချုပ်"}>
        <Card>
          <Detail
            label={summary.topCustomer.name}
            value={numberWithCommas(summary.topCustomer.amount) + " ကျပ်"}
          />
          <Detail
            label={summary.topDigit.name}
            value={numberWithCommas(summary.topDigit.amount) + " ကျပ်"}
          />
        </Card>
        <Card>
          <Detail label="စုစုပေါင်း စာရင်း" value={summary.totalInvoice} />
          <Detail
            label="စုစုပေါင်း ပမာဏ"
            value={numberWithCommas(summary.totalAmount) + " ကျပ်"}
          />
        </Card>
        <Card>
          <Detail
            startFlex={2}
            label={"ကြိမ်ရေအများဆုံး ဂဏန်း"}
            value={summary.frequentDigit}
          />
          <Detail
            startFlex={2}
            label={"ကြိမ်ရေအများဆုံး စျေးဝယ်"}
            value={summary.frequentCustomer}
          />
        </Card>
        <Info />
      </Section>
    </>
  );
}
