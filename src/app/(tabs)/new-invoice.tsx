import InvoiceForm from "@/components/new-invoice/invoice-form";
import KeyboardAvoidingView from "@/components/ui/keyboard-avoiding-view";
import Main from "@/components/ui/main";

export default function Screen() {
  return (
    <KeyboardAvoidingView>
      <Main>
        <InvoiceForm />
      </Main>
    </KeyboardAvoidingView>
  );
}
