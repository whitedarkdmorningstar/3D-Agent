import { db } from "./db";

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
        digit_id INTEGER,
        digit TEXT NOT NULL,
        amount INTEGER NOT NULL,
        invoice_id INTEGER NOT NULL, 
        FOREIGN KEY(invoice_id) REFERENCES invoices(id)
    )`);
}

export async function insertInvoiceAsync() {}
