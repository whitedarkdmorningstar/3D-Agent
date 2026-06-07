import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Row from "@/components/ui/row";
import { useSettings } from "@/context/settings.context";
import { useTrashes } from "@/context/trashes.context";
import {
  deleteAllTrashInvoicesAsync,
  deleteInvoicePermanentlyAsync,
} from "@/database/delete";
import { toast } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";

export default function ConfirmModal() {
  const router = useRouter();
  const trashes = useTrashes();
  const mode = "error";
  const action = useLocalSearchParams().action as "empty" | "delete";
  const { year, week } = useSettings();

  const handleConfirm = useCallback(async () => {
    // Go back to previous page
    router.back();

    if (action === "empty") {
      // Reset the list
      trashes.cleanList();
      // Delete all trashed invoices
      await deleteAllTrashInvoicesAsync(week, year);

      // Toast to user
      toast(`အမှိုက်ပုံးထဲမှ စာရင်းအားလုံးကို ဖျက်ပြီးပါပြီ`);
    } else {
      const selectedData = [...trashes.selectedData];

      // Remve from the list
      trashes.removeFromList(selectedData);

      // Toast to user
      toast(`စာရင်း ${selectedData.length} ခုကို လုံးဝ ဖျက်ပြီးပါပြီ`);

      // Delete invoices one by one
      for (const id of selectedData) {
        await deleteInvoicePermanentlyAsync(id);
      }
    }
  }, [
    trashes.selectedData,
    trashes.removeFromList,
    trashes.toggleSelectMode,
    action,
  ]);

  return (
    <Modal>
      <Alert
        variant={mode}
        title={"သတိပေးချက်"}
        description={
          action === "empty"
            ? `အမှိုက်ပုံးတွင်းရှိ စာရင်းအားလုံးကို လုံးဝ ဖျက်ပါမည်။ ပြန်လည် ရယူနိုင်မည် မဟုတ်ပါ။ လုပ်ဆောင်မှာ သေချာပါသလား?`
            : `စာရင်း ${trashes.selectedData.size} ခုကို လုံးဝ ဖျက်ပါမည်။ ပြန်လည် ရယူနိုင်မည် မဟုတ်ပါ။ လုပ်ဆောင်မှာ သေချာပါသလား?`
        }
      >
        <Row justifyContent={"flex-end"}>
          <Button variant={mode} mode={"outline"} onPress={router.back}>
            မလုပ်တော့ပါ
          </Button>
          <Button variant={mode} onPress={handleConfirm}>
            လုံးဝ ဖျက်မည်
          </Button>
        </Row>
      </Alert>
    </Modal>
  );
}
