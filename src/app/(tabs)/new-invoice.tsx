import KeyboardAvoidingView from "@/components/layout/keyboard-avoiding-view";
import Main from "@/components/layout/main";
import InvoiceForm from "@/components/new-invoice/invoice-form";

export default function NewInvoice() {
  return (
    <KeyboardAvoidingView>
      <Main>
        <InvoiceForm />
      </Main>
    </KeyboardAvoidingView>
  );
}
