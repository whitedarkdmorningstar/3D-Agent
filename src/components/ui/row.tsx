import { View, ViewProps } from "react-native";

export interface RowProps extends ViewProps {
  gap?: number;
  alignItem?: "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export default function Row(props: RowProps) {
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: "row",
          gap: props.gap,
          alignItems: props.alignItem || "center",
          justifyContent: props.justifyContent || "center",
        },
        props.style,
      ]}
    />
  );
}
