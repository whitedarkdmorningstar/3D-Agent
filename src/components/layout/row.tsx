import { View, ViewProps } from "react-native";

interface RowProps extends ViewProps {
  gap?: number;
  alignItems?: "center" | "flex-start" | "flex-end";
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
          alignItems: props.alignItems || "center",
          justifyContent: props.justifyContent,
        },
        props.style,
      ]}
    />
  );
}
