import {
  Customer,
  DashboardInvoice,
  Digit,
  DigitOutput,
  InvoiceOutput,
  Order,
  OrderBy,
  ThreeDigit,
} from "@/constants/invoice/schema";
import { generateCurrentWeek } from "@/constants/invoice/week";
import { Week, Year } from "@/constants/settings/schema";
import { db } from "./db";

export type SqliteReadOptions = {
  orderBy: OrderBy;
  order: Order;
  limit: number;
  offset: number;
  trashed: 0 | 1;
  year: Year;
  week: Week;
  isRandom: boolean;
};

// Fetch options
export const defaultSqliteReadOptions: SqliteReadOptions = {
  orderBy: "timestamp",
  order: "DESC",
  limit: 10,
  offset: 0,
  year: new Date().getFullYear(),
  week: generateCurrentWeek() || 0,
  trashed: 0,
  isRandom: false,
};

// fetch all invoices with options for pagination, sorting, and filtering by week and year
export async function fetchInvoicesAsync(
  fetchOptions: Partial<SqliteReadOptions> = defaultSqliteReadOptions,
): Promise<DashboardInvoice[]> {
  const options = { ...defaultSqliteReadOptions, ...fetchOptions };

  const invoices: DashboardInvoice[] = await db.getAllAsync(
    `SELECT * FROM invoices WHERE year = ? AND week = ? AND trashed = ? ORDER BY ${options.orderBy} ${options.order} LIMIT ? OFFSET ?`,
    [
      options.year,
      options.week,
      options.trashed,
      options.limit,
      options.offset,
    ],
  );

  return invoices;
}

export async function fetchInvoiceAsync(
  id: number,
): Promise<InvoiceOutput | null> {
  const rows = await db.getAllAsync<
    InvoiceOutput & { digit_id: string; digit: string; amount: number }
  >(
    `
    SELECT i.*, d.digit_id, d.digit, d.amount
    FROM invoices i
    LEFT JOIN digits d ON d.invoice_id = i.id
    WHERE i.id = ?
    `,
    [id],
  );

  if (rows.length === 0) {
    return null;
  }

  // Base invoice from the first row
  const invoice: InvoiceOutput = { ...rows[0], digits: [] };

  // Collect digits
  for (const row of rows) {
    if (row.digit) {
      invoice.digits.push({
        digit_id: row.digit_id,
        digit: row.digit,
        amount: row.amount,
      });
    }
  }

  return invoice;
}

// fetch distinct customer names
export async function fetchCustomersAsync(
  fetchOptions: Partial<SqliteReadOptions> = defaultSqliteReadOptions,
): Promise<Customer[]> {
  const options = {
    ...defaultSqliteReadOptions,
    ...fetchOptions,
  };

  const names = await db.getAllAsync<Customer>(
    `SELECT DISTINCT name FROM invoices WHERE trashed = 0 AND week = ? AND year = ? ORDER BY name ${options.order} LIMIT ? OFFSET ?`,
    [options.week, options.year, options.limit, options.offset],
  );

  return names;
}

// fetch invoices of a customer
export async function fetchInvoicesOfACustomerAsync(
  name: string,
  fetchOptions: Partial<SqliteReadOptions>,
): Promise<InvoiceOutput[]> {
  const options = { ...defaultSqliteReadOptions, ...fetchOptions };

  // Fetch invoices with their digits in one query
  const rows = await db.getAllAsync<
    InvoiceOutput & { digit_id: string; digit: string; amount: number }
  >(
    `
    SELECT i.*, d.digit_id, d.digit, d.amount
    FROM invoices i
    LEFT JOIN digits d ON d.invoice_id = i.id
    WHERE i.name = ?
      AND i.trashed = ?
      AND i.week = ?
      AND i.year = ?
    ORDER BY ${options.orderBy} ${options.order}
    LIMIT ? OFFSET ?
    `,
    [
      name,
      options.trashed,
      options.week,
      options.year,
      options.limit,
      options.offset,
    ],
  );

  // Group digits under each invoice
  const invoiceMap = new Map<number, InvoiceOutput>();

  for (const row of rows) {
    if (!invoiceMap.has(row.id)) {
      invoiceMap.set(row.id, { ...row, digits: [] });
    }
    if (row.digit) {
      invoiceMap.get(row.id)!.digits.push({
        digit_id: row.digit_id,
        digit: row.digit,
        amount: row.amount,
      });
    }
  }

  return Array.from(invoiceMap.values());
}

// fetch all invoies of a digit
export async function fetchInvoicesOfADigitAsync(
  digit: ThreeDigit,
  fetchOptions: Partial<SqliteReadOptions>,
): Promise<DigitOutput[]> {
  const options = { ...defaultSqliteReadOptions, ...fetchOptions };

  const rows = await db.getAllAsync<DigitOutput>(
    `
    SELECT i.*, d.digit, d.amount
    FROM invoices i
    JOIN digits d ON d.invoice_id = i.id
    WHERE d.digit = ?
      AND i.digit_names LIKE ?
      AND i.year = ?
      AND i.week = ?
      AND i.trashed = 0
    ORDER BY i.created_at DESC
    `,
    [digit, `%${digit}%`, options.year, options.week],
  );

  return rows;
}

export async function searchCustomerAsync(
  name: string,
  fetchOptions: Partial<SqliteReadOptions>,
): Promise<DashboardInvoice[]> {
  const options = { ...defaultSqliteReadOptions, ...fetchOptions };

  return await db.getAllAsync(
    `SELECT * FROM invoices WHERE name LIKE ? AND trashed = ? AND year = ? AND week = ? ORDER BY ${options.orderBy} ${options.order} LIMIT ? OFFSET ?`,
    [
      `%${name}%`,
      options.trashed,
      options.year,
      options.week,
      options.limit,
      options.offset,
    ],
  );
}

// For summary

export type SummaryOutput = {
  totalInvoice: number;
  totalAmount: number;
  nonEmptyDigits: number;
  frequentDigit: ThreeDigit;
  frequentCustomer: string;
  topCustomer: { name: string; amount: number };
  topDigit: { name: ThreeDigit; amount: number };
};

export async function fetchSummaryAsync(
  fetchOptions: Partial<SqliteReadOptions>,
): Promise<SummaryOutput> {
  const options = { ...defaultSqliteReadOptions, ...fetchOptions };

  const totalInvoiceRow = await db.getFirstAsync<{ totalInvoice: number }>(
    `SELECT COUNT(*) AS totalInvoice FROM invoices WHERE trashed = 0 AND year = ? AND week = ?`,
    [options.year, options.week],
  );

  const totalAmountRow = await db.getFirstAsync<{ totalAmount: number }>(
    `SELECT SUM(total_amount) AS totalAmount FROM invoices WHERE trashed = 0 AND year = ? AND week = ?`,
    [options.year, options.week],
  );

  const nonEmptyDigitsRow = await db.getFirstAsync<{ nonEmptyDigits: number }>(
    `SELECT COUNT(DISTINCT d.digit) AS nonEmptyDigits
      FROM digits d
      JOIN invoices i ON d.invoice_id = i.id
      WHERE i.trashed = 0
      AND i.year = ?
      AND i.week = ?;`,
    [options.year, options.week],
  );

  const frequentDigitRow = await db.getFirstAsync<{
    frequentDigit: ThreeDigit;
  }>(
    `SELECT d.digit AS frequentDigit
   FROM digits d
   JOIN invoices i ON d.invoice_id = i.id
   WHERE i.trashed = 0
     AND i.year = ?
     AND i.week = ?
   GROUP BY d.digit
   ORDER BY COUNT(*) DESC
   LIMIT 1`,
    [options.year, options.week],
  );

  const frequentCustomerRow = await db.getFirstAsync<{
    frequentCustomer: string;
  }>(
    `SELECT name AS frequentCustomer 
     FROM invoices 
     WHERE trashed = 0 AND year = ? AND week = ?
     GROUP BY name 
     ORDER BY COUNT(*) DESC 
     LIMIT 1`,
    [options.year, options.week],
  );

  const customerRow = await db.getFirstAsync<{
    topCustomer: string;
    totalSpent: number;
  }>(
    `SELECT name AS topCustomer, SUM(total_amount) AS totalSpent
     FROM invoices
     WHERE trashed = 0 AND year = ? AND week = ?
     GROUP BY name
     ORDER BY totalSpent DESC
     LIMIT 1`,
    [options.year, options.week],
  );

  const digitRow = await db.getFirstAsync<{
    topDigit: ThreeDigit;
    totalDigitAmount: number;
  }>(
    `SELECT d.digit AS topDigit, SUM(d.amount) AS totalDigitAmount
     FROM digits d
     JOIN invoices i ON d.invoice_id = i.id
     WHERE i.trashed = 0 AND i.year = ? AND i.week = ?
     GROUP BY d.digit
     ORDER BY totalDigitAmount DESC
     LIMIT 1`,
    [options.year, options.week],
  );

  return {
    totalInvoice: totalInvoiceRow?.totalInvoice ?? 0,
    totalAmount: totalAmountRow?.totalAmount ?? 0,
    nonEmptyDigits: nonEmptyDigitsRow?.nonEmptyDigits ?? 0,
    frequentDigit: frequentDigitRow?.frequentDigit ?? ("---" as ThreeDigit),
    frequentCustomer: frequentCustomerRow?.frequentCustomer ?? "",
    topCustomer: {
      name: customerRow?.topCustomer ?? "",
      amount: customerRow?.totalSpent ?? 0,
    },
    topDigit: {
      name: digitRow?.topDigit ?? ("---" as ThreeDigit),
      amount: digitRow?.totalDigitAmount ?? 0,
    },
  };
}

// For digits
export interface DigitOptions extends Omit<SqliteReadOptions, "orderBy"> {
  orderBy: "digit" | "total_amount";
}

export async function fetchDigitsAsync(
  fetchOptions: Partial<DigitOptions>,
): Promise<Digit[]> {
  const options = { ...defaultSqliteReadOptions, ...fetchOptions };

  return await db.getAllAsync(
    `SELECT d.digit, SUM(d.amount) AS total_amount
    FROM digits d
    JOIN invoices i ON d.invoice_id = i.id
    WHERE i.trashed = 0
      AND i.year = ?
      AND i.week = ?
    GROUP BY d.digit
    ORDER BY ${options.orderBy === "digit" ? "d.digit" : "total_amount"} ${options.order};`,
    [options.year, options.week, options.limit, options.offset],
  );
}
