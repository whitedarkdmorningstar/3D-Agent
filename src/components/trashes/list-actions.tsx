import { useTrashes } from "@/context/trashes.context";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import IconButton from "../ui/icon-button";
import Row from "../ui/row";

export default function TrashesListActions() {
  const trashes = useTrashes();
  const router = useRouter();

  const handleEmptyTrash = useCallback(
    () =>
      trashes.data.length > 0 &&
      router.push({
        pathname: "/modals/trashes-confirm-modal",
        params: { action: "empty" },
      }),
    [trashes.data],
  );

  return (
    <Row>
      <IconButton
        disabled={trashes.data.length === 0}
        name={"delete-empty"}
        variant={"error"}
        onPress={handleEmptyTrash}
      />
      <IconButton
        disabled={trashes.data.length === 0}
        name={trashes.isSelectMode ? "close" : "pencil"}
        onPress={trashes.toggleSelectMode}
      />
    </Row>
  );
}
