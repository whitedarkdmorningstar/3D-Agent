import z from "zod";
import { weekSchema, yearSchema } from "../settings/schema";

export const numberSchema = z.coerce
  .number("ဂဏန်းသည် ကိန်းဂဏန်းဖြစ်ရပါမည်")
  .int("ဂဏန်းသည် ဒဿမ မဖြစ်ရပါ")
  .min(0, "ဂဏန်းသည် အနည်းဆုံး 0 ဖြစ်ရပါမည်")
  .max(9, "ဂဏန်းသည် အများဆုံး 9 ဖြစ်ရပါမည်");

export const amountSchema = z.coerce
  .number("ပမာဏသည် ကိန်းဂဏန်းဖြစ်ရပါမည်")
  .gt(0, "ပမာဏသည် သုညထက် ကြီးရပါမည်");

export const threeDigitSchema = z
  .string()
  .regex(/^[0-9]{3}$/, "ဂဏန်း ၃ လုံး ဖြစ်ရပါမည်");

export const orderBySchema = z.enum([
  "created_at",
  "total_amount",
  "name",
  "digit",
  "timestamp",
  "updated_at",
]);

export const orderSchema = z.enum(["ASC", "DESC"]);

// Invoice
export const invoiceDigitSchema = z.object({
  digit_id: z.string().min(1),
  digit: threeDigitSchema,
  amount: amountSchema,
});

export const invoiceSchema = z.object({
  name: z.string().min(1, "အမည်သည် ကွက်လပ် မဖြစ်ရပါ"),
  digits: z.array(invoiceDigitSchema),
  note: z.string().optional(),
});

export const invoiceInputSchema = z.object({
  ...invoiceSchema.shape,
  year: yearSchema,
  week: weekSchema,
});

export const inoiceOutputSchema = z.object({
  ...invoiceInputSchema.shape,
  id: z.number(),
  digit_names: z.string(),
  total_amount: amountSchema,
  timestamp: z.number(),
  created_at: z.number(),
  updated_at: z.number().nullable(),
  trashed: z.number(),
});

export const customerSchema = z.object({
  name: z.string().min(1, "အမည်သည် ကွက်လပ် မဖြစ်ရပါ"),
  id: z.number(),
});

// Types
export type Number = z.infer<typeof numberSchema>;
export type Amount = z.infer<typeof amountSchema>;
export type ThreeDigit = z.infer<typeof threeDigitSchema>;
export type OrderBy = z.infer<typeof orderBySchema>;
export type Order = z.infer<typeof orderSchema>;
export type InvoiceDigit = z.infer<typeof invoiceDigitSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoiceInput = z.infer<typeof invoiceInputSchema>;
export type InvoiceOutput = z.infer<typeof inoiceOutputSchema>;
export type DashboardInvoice = Omit<InvoiceOutput, "digits">;
export type Customer = z.infer<typeof customerSchema>;
