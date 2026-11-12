import z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, { error: "Name must be at least 2 characters" })
      .max(50, { error: "Name cannot exceed 50 characters" })
      .trim(),

    email: z.email({ error: "Invalid email address" }).toLowerCase().trim(),

    password: z
      .string({ error: "Password is required" })
      .min(6, { error: "Password must be at least 6 characters" })
      .max(20)
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { error: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character",
      }),

    confirmPassword: z
      .string({ error: "Enter the password again" })
      .min(1, { error: "Enter the password again" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email({ error: "Invalid email address" }).toLowerCase().trim(),
  password: z.string({ error: "Password is required" }),
});
