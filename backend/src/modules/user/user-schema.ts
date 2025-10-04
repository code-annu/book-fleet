import z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUserProfileSchema = z.object({
  id: z.string().trim().min(1, "User id required"),
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim(),
  role: z.string().trim().min(1, "Role is required"),
  address: z.string().trim(),
  profile_picture_url: z.string().trim(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email format"),
});
