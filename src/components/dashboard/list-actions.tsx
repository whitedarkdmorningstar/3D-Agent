import FAB from "../common/fab";
import Row from "../layout/row";

interface ListActionsProps {
  scrollToTop: () => void;
  toggleSelectMode: () => void;
  moveSelectedToTrash: () => void;
}

export default function ListActions() {
  return (
    <Row style={{ position: "absolute", bottom: 20 }}>
      <FAB icon={"delete-variant"} variant="error" />
      <FAB icon={"pencil"} variant="secondary" />
      <FAB icon={"arrow-up"} variant="secondary" />
    </Row>
  );
}
