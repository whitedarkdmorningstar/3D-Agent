import {
  Customer,
  DashboardInvoice,
  InvoiceDigit,
  InvoiceOutput,
  Order,
  OrderBy,
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

export async function fetchDigitsAsync(
  invoice_id: number,
): Promise<InvoiceDigit[]> {
  return await db.getAllAsync(
    `SELECT digit_id, digit, amount FROM digits WHERE invoice_id = ?`,
    [invoice_id],
  );
}

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

// fetch single invoice by id including its digits
export async function fetchInvoiceAsync(
  id: number,
): Promise<InvoiceOutput | null> {
  const invoice = await db.getFirstAsync<InvoiceOutput>(
    `SELECT * FROM invoices WHERE id = ?`,
    [id],
  );

  if (!invoice) {
    return null;
  }

  invoice.digits = await fetchDigitsAsync(invoice.id);

  return invoice;
}

// fetch customer names, ids
export async function fetchCustomersAsync(
  fetchOptions: Partial<SqliteReadOptions> = defaultSqliteReadOptions,
): Promise<Customer[]> {
  const options = {
    ...defaultSqliteReadOptions,
    isRandom: true,
    ...fetchOptions,
  };

  const names = options.isRandom
    ? await db.getAllAsync<Customer>(
        `SELECT DISTINCT name, id FROM invoices WHERE trashed = 0 AND week = ? AND year = ? ORDER BY RANDOM() LIMIT ? OFFSET ?`,
        [options.week, options.year, options.limit, options.offset],
      )
    : await db.getAllAsync<Customer>(
        `SELECT DISTINCT name, id FROM invoices WHERE trashed = 0 AND week = ? AND year = ? ORDER BY ${options.orderBy} ${options.order} LIMIT ? OFFSET ?`,
        [options.week, options.year, options.limit, options.offset],
      );

  return names;
}
