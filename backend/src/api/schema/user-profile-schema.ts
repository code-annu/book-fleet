import z, { minLength } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- User Profile Create Schema ---
export const userProfileCreateSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  role: z.string().trim().min(1, "Role is required"),
  address: z.string().trim().min(1, "Address is required"),
  profile_picture_url: z
    .string()
    .trim()
    .min(1, "Profile picture url is required"),
});

// --- User Profile Update Schema ---
// All fields optional for partial updates
export const userProfileUpdateSchema = userProfileCreateSchema.partial();
