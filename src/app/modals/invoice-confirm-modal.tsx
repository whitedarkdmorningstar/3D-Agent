import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Row from "@/components/ui/row";
import { useInvoices } from "@/context/invoices.context";
import { useTrashes } from "@/context/trashes.context";
import { deleteInvoicePermanentlyAsync } from "@/database/delete";
import { moveInvoiceToTrashAsync } from "@/database/update";
import { toast } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

export default function ConfirmModal() {
  const router = useRouter();
  const { id, action } = useLocalSearchParams() as {
    id: string;
    action: "trash" | "delete";
  };
  const invoices = useInvoices();
  const trashes = useTrashes();

  const mode = useMemo(
    () => (action === "trash" ? "warning" : "error"),
    [action],
  );

  // Handle confirm
  const handleConfirm = useCallback(async () => {
    // After the action is completed, go back to last 2 pages
    router.dismiss(2);

    // Remove from invoices list
    invoices.removeFromList([Number(id)]);

    // Move to trash or delete permanently based on the action
    if (action === "trash") {
      // Move the invoice to trash
      await moveInvoiceToTrashAsync(Number(id));
      toast(`စာရင်းအမှတ် ${id} ကို အမှိုက်ပုံးထဲသို့ ရွေ့ပြီးပါပြီ`);
      // Refresh trash list
      trashes.fetchInitialData();
    } else {
      // Permanently delete the invoice
      await deleteInvoicePermanentlyAsync(Number(id));
      toast(`စာရင်းအမှတ် ${id} ကို လုံးဝ ဖျက်ပြီးပါပြီ`);
    }
  }, [id, action]);

  return (
    <Modal>
      <Alert
        variant={mode}
        title="သတိပေးချက်"
        description={
          action === "trash"
            ? "ဤစာရင်းကို အမှိုက်ပုံးထဲသို့ ရွှေ့မည်။ အမှိုက်ပုံးထဲမှ ပြန်လည်ရယူနိုင်ပါသည်။"
            : "ဤစာရင်းကို လုံးဝ ဖျက်ပစ်မည်။ ပြန်လည် ရယူနိုင်မည် မဟုတ်တော့ပါ။ ဖျက်မှာ သေချာပါသလား။"
        }
      >
        <Row justifyContent={"flex-end"}>
          <Button variant={mode} mode={"outline"} onPress={router.back}>
            မလုပ်တော့ပါ
          </Button>
          <Button variant={mode} onPress={handleConfirm}>
            {action === "trash" ? "အမှိုက်ပုံးသို့ ရွှေ့မည်" : "လုံးဝ ဖျက်မည်"}
          </Button>
        </Row>
      </Alert>
    </Modal>
  );
}
