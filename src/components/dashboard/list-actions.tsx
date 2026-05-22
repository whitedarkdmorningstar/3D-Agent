import { StyleSheet } from "react-native";
import FAB from "../common/fab";
import Row from "../layout/row";

interface ListActionsProps {
  isSelectMode: boolean;
  selectedData: Set<string>;
  scrollToTop: () => void;
  toggleSelectMode: () => void;
  moveSelectedToTrash: () => void;
}

export default function ListActions(props: ListActionsProps) {
  return (
    <Row style={styles.row} justifyContent="space-between">
      <FAB
        icon={"delete-variant"}
        variant="error"
        disabled={props.selectedData.size === 0 || !props.isSelectMode}
        onPress={props.moveSelectedToTrash}
      />
      <FAB
        icon={props.isSelectMode ? "close-thick" : "pencil"}
        variant={props.isSelectMode ? "primary" : "secondary"}
        onPress={props.toggleSelectMode}
      />
      <FAB icon={"arrow-up"} variant="secondary" onPress={props.scrollToTop} />
    </Row>
  );
}

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
});
