import { db } from "./db";

// Delete forever
export async function deleteInvoiceForeverAsync(id: number) {
  // Delete the invoice first
  await db.runAsync("DELETE FROM invoices WHERE id = ?", [id]);

  // Then delete the associated digits
  await db.runAsync("DELETE FROM digits WHERE invoice_id = ?", [id]);
}
