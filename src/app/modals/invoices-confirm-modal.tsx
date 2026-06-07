import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Row from "@/components/ui/row";
import { useInvoices } from "@/context/invoices.context";
import { useTrashes } from "@/context/trashes.context";
import { moveInvoiceToTrashAsync } from "@/database/update";
import { toast } from "@/utils/toast";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function ConfirmModal() {
  const router = useRouter();
  const invoices = useInvoices();
  const trashes = useTrashes();
  const mode = "warning";

  const handleConfirm = useCallback(async () => {
    const selectedData = [...invoices.selectedData];

    // Go back to previous page
    router.back();

    // Remve from the list
    invoices.removeFromList(selectedData);

    // Refesh trash list
    trashes.fetchInitialData();

    // Toast to user
    toast(
      `စာရင်း ${selectedData.length} ခုကို အမှိုက်ပုံးထဲသို့ ရွေ့ပြီးပါပြီ`,
    );

    // Move to trash one by one
    for (const id of selectedData) {
      await moveInvoiceToTrashAsync(id);
    }
  }, [
    invoices.selectedData,
    invoices.removeFromList,
    invoices.toggleSelectMode,
  ]);

  return (
    <Modal>
      <Alert
        variant={mode}
        title={"သတိပေးချက်"}
        description={`စာရင်း ${invoices.selectedData.size} ခုကို အမှိုက်ပုံးထဲသို့ ရွေ့မည်။ အမှိုက်ပုံးထဲမှ ပြန်လည်ရယူနိုင်ပါသည်။ လုပ်ဆောင်မှာ သေချာပါသလား?`}
      >
        <Row justifyContent={"flex-end"}>
          <Button variant={mode} mode={"outline"} onPress={router.back}>
            မလုပ်တော့ပါ
          </Button>
          <Button variant={mode} onPress={handleConfirm}>
            အမှိုက်ပုံးသို့ ရွှေ့မည်
          </Button>
        </Row>
      </Alert>
    </Modal>
  );
}
