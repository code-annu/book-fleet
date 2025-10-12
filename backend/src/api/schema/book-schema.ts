import { z } from "zod";

// --- Book Condition Enum ---
export enum BookCondition {
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

// --- Book Sale Create Schema ---
export const bookCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  price: z.float64({ error: "Required" }),
  thumbnail_url: z.string().trim().min(1, "Thumbnail URL is required"),
  pickup_address: z.string().trim().min(1, "Pickup address is required"),
  description: z.string().trim().min(1, "Description is required"),
  book_condition: z.enum(BookCondition, {
    error: "Book condition is required",
  }),
});

// --- Book Sale Update Schema ---
// All fields optional for partial updates
export const bookUpdateSchema = bookCreateSchema.partial().extend({
  sold_out: z.boolean().optional(),
  available: z.boolean().optional(),
});
