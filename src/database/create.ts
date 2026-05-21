import { InvoiceInput } from "@/constants/invoice/schema";
import { db } from "./db";

/**
 * Invoices
 * | id | name | digits | total_amount | created_at | timestamp | updated_at | note | year | week | trashed |
 */

export async function createTablesIfNotExistAsync() {
  await db.execAsync(`CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        digit_names TEXT,
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
  try {
    const timestamp = new Date().getTime();

    let total_amount = getTotalAmount(invoiceInput.digits);

    const { lastInsertRowId } = await db.runAsync(
      `INSERT INTO invoices (name, digit_names, total_amount, created_at, timestamp, updated_at, note, year, week, trashed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        invoiceInput.name,
        invoiceInput.digits.map((d) => d.digit).join(","),
        total_amount,
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
    if (!Boolean(lastInsertRowId)) {
      console.error("Failed to insert invoice");
      return false;
    }

    for (const digit of invoiceInput.digits) {
      await db.runAsync(
        `INSERT INTO digits (digit_id, digit, amount, invoice_id) VALUES (?, ?, ?, ?)`,
        [digit.digit_id, digit.digit, digit.amount, lastInsertRowId],
      );
    }

    return true;
  } catch (error) {
    console.error("Error inserting invoice:", error);
    return false;
  }
}

// Populate random data
import { getTotalAmount } from "@/utils/invoice";
import { getId } from "@/utils/numbers";
import { faker } from "@faker-js/faker";

export async function seedRandomDataAsync(count: number = 1000) {
  for (let i = 0; i < count; i++) {
    const name = faker.person.fullName();
    const digits = new Array(faker.number.int({ min: 1, max: 10 }))
      .fill(0)
      .map((e) => ({
        digit: faker.number
          .int({ min: 0, max: 999 })
          .toString()
          .padStart(3, "0"),
        digit_id: getId(),
        amount: faker.number.int({ min: 100, max: 100000 }),
      }));

    const invoice: InvoiceInput = {
      name,
      week: 10,
      year: 2026,
      digits,
    };

    await insertInvoiceAsync(invoice);

    console.log("Finished", i);
  }
}
