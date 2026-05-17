import { InvoiceInput } from "@/constants/invoice/schema";
import { db } from "./db";

/**
 * Invoices
 * | id | name | total_amount | created_at | timestamp | updated_at | note | year | week | trashed |
 */

export async function createTablesIfNotExistAsync() {
  await db.execAsync(`CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        total_amount INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        timestamp INTEGER NOT NULL,
        updated_at INTEGER,
        note TEXT,
        year INTEGER NOT NULL,
        week INTEGER NOT NULL,
        trashed INTEGER
    )`);
  await db.execAsync(`CREATE TABLE IF NOT EXISTS digits (
        id INTEGER PRIMARY KEY,
        digit_id TEXT,
        digit TEXT NOT NULL,
        amount INTEGER NOT NULL,
        invoice_id INTEGER NOT NULL, 
        FOREIGN KEY(invoice_id) REFERENCES invoices(id)
    )`);
}

// Insert invoice
export async function insertInvoiceAsync(invoiceInput: InvoiceInput) {
  const timestamp = new Date().getTime();

  const { lastInsertRowId } = await db.runAsync(
    `INSERT INTO invoices (name, total_amount, created_at, timestamp, updated_at, note, year, week, trashed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      invoiceInput.name,
      invoiceInput.total_amount,
      timestamp,
      timestamp,
      null,
      invoiceInput.note || "",
      invoiceInput.year,
      invoiceInput.week,
      0,
    ],
  );

  // After invoice id is returned, add each digit to digits table
  if (!Boolean(lastInsertRowId))
    return console.error("Failed to insert invoice");

  for (const digit of invoiceInput.digits) {
    await db.runAsync(
      `INSERT INTO digits (digit_id, digit, amount, invoice_id) VALUES (?, ?, ?, ?)`,
      [digit.digit_id, digit.digit, digit.amount, lastInsertRowId],
    );
  }

  return true;
}
