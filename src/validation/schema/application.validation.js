import z from "zod";
import { fileSchema } from "./file.validation";

export const createApplicationSchema = z.object({
  fullName: z
    .string({ error: "Name is required" })
    .trim()
    .min(3, { error: "Name must be at least 3 characters" }),
  email: z.email().toLowerCase().trim(),
  age: z.coerce
    .number({ error: "Age is required" })
    .gte(18, { error: "Under 18 is not allowed to be a trainer" }),
  profileImage: fileSchema,
  yearsOfExperience: z.coerce
    .number({ error: "Experience year is required" })
    .gte(2, {
      error: "You must have 2 years of experiecne to apply as a trainer",
    }),
  skills: z
    .array(
      z
        .string({ error: "Skills are required" })
        .trim()
        .min(1, { error: "Can't be empty string" }),
    )
    .nonempty({ error: "Skills are required" }),
  availableDays: z
    .array(
      z.enum(
        [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        {
          error: "Please enter a valid day's name, e.g. (Saturday,Sunday...)",
        },
      ),
    )
    .nonempty({ error: "Days are required" }),
  availableTime: z
    .string({ error: "Available time is required" })
    .trim()
    .min(1, { error: "Available time is required" }),
});
