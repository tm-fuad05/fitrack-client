import { createApplicationSchema } from "./application.validation";

export const updateTrainerSchema = createApplicationSchema
  .pick({
    availableDays: true,
    availableTime: true,
  })
  .partial();
