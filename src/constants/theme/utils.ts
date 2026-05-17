import { MD3Type } from "react-native-paper/src/types";

export function calculateLineHeight(fontSize: number): number {
  let ratio: number;

  if (fontSize <= 12) {
    ratio = 1.6; // tiny text needs extra space
  } else if (fontSize <= 16) {
    ratio = 1.5; // 16px → 24px
  } else if (fontSize <= 20) {
    ratio = 1.4;
  } else {
    ratio = 1.3; // large display text
  }

  return Math.round(fontSize * ratio);
}

export function getMD3Object(fontSize: number): MD3Type {
  return {
    fontSize,
    lineHeight: calculateLineHeight(fontSize),
    fontFamily: "sans-serif",
    fontWeight: "400",
    letterSpacing: 0,
  };
}
