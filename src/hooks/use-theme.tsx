import { CombinedTheme } from "@/constants/theme/types";
import { useTheme as usePaperTheme } from "react-native-paper";

export default function useTheme() {
  return usePaperTheme<CombinedTheme>();
}
