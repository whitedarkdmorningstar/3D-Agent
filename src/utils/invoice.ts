import { InvoiceDigit, ThreeDigit } from "@/constants/invoice/schema";

// When change in digit, replace the digit in the specific index with the new value and return the new digit
export function replaceDigit(
  digit: ThreeDigit,
  value: string | number,
  index: 0 | 1 | 2,
): ThreeDigit {
  const digitArray = digit.split("");
  digitArray[index] = value.toString();

  return digitArray.join("");
}

// Get all round digits of a digit, e.g. 123 => [132, 213, 231, 312, 321]
// Excluding original digit
export function getRoundDigits(digit: ThreeDigit): ThreeDigit[] {
  const digits = digit.split("");

  function permute(arr: string[]): string[][] {
    if (arr.length === 0) return [[]];

    const result: string[][] = [];

    arr.forEach((digit, i) => {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const perms = permute(rest);
      perms.forEach((p) => result.push([digit, ...p]));
    });

    return result;
  }

  const allPerms = permute(digits)
    .map((p) => p.join(""))
    .filter((perm) => perm !== digit);

  return Array.from(new Set(allPerms));
}

// Get total amount of digits
export function getTotalAmount(digits: InvoiceDigit[]): number {
  let total = 0;

  digits.map(({ amount }) => (total += amount));

  return total;
}
