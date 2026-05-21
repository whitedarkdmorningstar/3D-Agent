import { MD3Type } from "react-native-paper/src/types";

export function calculateLineHeight(fontSize: number): number {
  let ratio: number;

  if (fontSize <= 16) {
    ratio = 1.7; // tiny text needs extra space
  } else if (fontSize <= 20) {
    ratio = 1.6;
  } else {
    ratio = 1.4; // large display text
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
