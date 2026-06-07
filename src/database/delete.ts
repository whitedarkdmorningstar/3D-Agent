import { Week, Year } from "@/constants/settings/schema";
import { db } from "./db";

// Delete permanently
export async function deleteInvoicePermanentlyAsync(id: number) {
  // Delete the invoice first
  await db.runAsync("DELETE FROM invoices WHERE id = ?", [id]);

  // Then delete the associated digits
  await db.runAsync("DELETE FROM digits WHERE invoice_id = ?", [id]);
}

// Delete all trash invoices and its digits with week, year and trashed = 1
export async function deleteAllTrashInvoicesAsync(week: Week, year: Year) {
  const ids = (await db.getAllAsync(
    "SELECT id FROM invoices WHERE week = ? AND year = ? AND trashed = ?",
    [week, year, 1],
  )) as { id: number }[];

  for (const id of ids) {
    await deleteInvoicePermanentlyAsync(id.id);
  }
}
