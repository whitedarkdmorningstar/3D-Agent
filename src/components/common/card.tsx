import React from "react";
import { StyleSheet } from "react-native";
import { Card as PaperCard, useTheme } from "react-native-paper";

export default function Card(props: React.ComponentProps<typeof PaperCard>) {
  const { colors } = useTheme();

  return (
    <PaperCard
      {...props}
      style={[
        {
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.outline,
        },
        props.style,
      ]}
    />
  );
}

Card.Title = PaperCard.Title;
Card.Content = PaperCard.Content;
Card.Cover = PaperCard.Cover;
Card.Actions = PaperCard.Actions;
