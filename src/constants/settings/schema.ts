import { z } from "zod";

export const themeModeSchema = z.enum(["light", "dark", "system"]);

export const languageSchema = z.enum(["english", "myanmar"]);

export const weekSchema = z.coerce.number().min(0).max(24);

export const yearSchema = z.coerce
  .number()
  .min(1900)
  .max(9999)
  .optional()
  .default(new Date().getFullYear());

export const limitSchema = z.number().min(5).max(10);

export const settingsSchema = z.object({
  mode: themeModeSchema,
  language: languageSchema,
  week: weekSchema,
  year: yearSchema,
  limit: limitSchema,
});

// Types
export type ThemeMode = z.infer<typeof themeModeSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Week = z.infer<typeof weekSchema>;
export type Year = z.infer<typeof yearSchema>;
export type Limit = z.infer<typeof limitSchema>;
export type Settings = z.infer<typeof settingsSchema>;
