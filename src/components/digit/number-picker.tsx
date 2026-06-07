import { ThreeDigit } from "@/constants/invoice/schema";
import useTheme from "@/hooks/use-theme";
import WheelPicker from "@quidone/react-native-wheel-picker";
import Card from "../ui/card";
import Row from "../ui/row";
import Text from "../ui/text";
import { DigitHookOutput } from "./use-digit";

export type Item = { label: string; value: number };

export const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => ({
  label: num.toString(),
  value: num,
})) as Item[];

export default function NumberPicker({
  digit,
  handleDigitChange,
}: {
  digit: ThreeDigit;
  handleDigitChange: DigitHookOutput["handleDigitChange"];
}) {
  return (
    <>
      <Text>ဂဏန်း</Text>
      <Card>
        <Row>
          {[0, 1, 2].map((e) => (
            <NumberWheelPicker
              key={e}
              index={e as 0 | 1 | 2}
              value={Number(digit[e])}
              handleDigitChange={handleDigitChange}
            />
          ))}
        </Row>
      </Card>
    </>
  );
}

function NumberWheelPicker({
  value,
  index,
  handleDigitChange = () => null,
}: {
  value: number;
  index: 0 | 1 | 2;
  handleDigitChange: DigitHookOutput["handleDigitChange"];
}) {
  const { colors } = useTheme();

  return (
    <WheelPicker
      style={{ flex: 1 }}
      overlayItemStyle={{
        borderRadius: 0,
      }}
      value={value}
      data={NUMBERS}
      onValueChanged={({ item }) => handleDigitChange(item.value, index)}
      itemTextStyle={{ color: colors.text }}
      enableScrollByTapOnItem
      visibleItemCount={3}
    />
  );
}
