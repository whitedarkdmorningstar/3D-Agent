import z from "zod";
import { weekSchema, yearSchema } from "../settings/schema";

export const numberSchema = z.coerce
  .number({ error: "ဂဏန်းဖြစ်ရပါမည်" })
  .min(0, "Must be at least 0")
  .max(9, "Must be at most 9");

export const threeDigitSchema = z
  .string()
  .regex(/^[0-9]{3}$/, "Must be 3 digits");

export const orderBySchema = z.enum([
  "created_at",
  "amount",
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
  amount: numberSchema,
});

export const invoiceSchema = z.object({
  name: z.string().min(1),
  digits: z.array(invoiceDigitSchema),
  total_amount: z.coerce.number().min(1),
  note: z.string().optional(),
});

export const invoiceInputSchema = z.object({
  ...invoiceSchema.shape,
  year: yearSchema,
  week: weekSchema,
});

// Types
export type Number = z.infer<typeof numberSchema>;
export type ThreeDigit = z.infer<typeof threeDigitSchema>;
export type OrderBy = z.infer<typeof orderBySchema>;
export type Order = z.infer<typeof orderSchema>;
export type InvoiceDigit = z.infer<typeof invoiceDigitSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoiceInput = z.infer<typeof invoiceInputSchema>;
