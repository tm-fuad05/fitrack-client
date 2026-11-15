import z from "zod";
import { fileSchema } from "./file.validation";

export const updateProfileSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(3, { error: "Name must be at least 3 characters" })
      .trim(),
    profileImage: fileSchema,
  })
  .partial();
