import { db } from "./db";

// Move to trash
export async function moveInvoiceToTrashAsync(id: number) {
  return await db.runAsync("UPDATE invoices SET trashed = 1 WHERE id = ?", [
    id,
  ]);
}
