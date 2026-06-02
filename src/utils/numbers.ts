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
