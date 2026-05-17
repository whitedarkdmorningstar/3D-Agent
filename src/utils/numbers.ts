import { ThreeDigit } from "@/constants/invoice/schema";
import { randomUUID } from "expo-crypto";

export function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const BURMESE_NUMBERS = [
  "၀",
  "၁",
  "၂",
  "၃",
  "၄",
  "၅",
  "၆",
  "၇",
  "၈",
  "၉",
];

export function toNativeNumber(value: number, nativeNumbers = BURMESE_NUMBERS) {
  return value
    .toString()
    .split("")
    .map((num) => nativeNumbers[Number(num)])
    .join("");
}

export function getId(): string {
  // return new Date().getTime();
  return randomUUID();
}

export function replaceDigit(
  digit: ThreeDigit,
  value: string | number,
  index: 0 | 1 | 2,
): ThreeDigit {
  const digitArray = digit.split("");
  digitArray[index] = value.toString();

  return digitArray.join("");
}

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
