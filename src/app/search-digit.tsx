import CustomerTable from "@/components/digit/customer-table";
import NumberPicker from "@/components/digit/number-picker";
import useDigit from "@/components/digit/use-digit";
import Divider from "@/components/ui/divider";
import Main from "@/components/ui/main";
import Text from "@/components/ui/text";

export default function Digit() {
  const digit = useDigit();

  return (
    <Main isScrollable>
      <NumberPicker
        digit={digit.digit}
        handleDigitChange={digit.handleDigitChange}
      />
      <Divider />
      <Text>{digit.digit} ဂဏန်း၏ စာရင်းများ</Text>
      <CustomerTable invoices={digit.invoices} isLoading={digit.isLoading} />
    </Main>
  );
}
