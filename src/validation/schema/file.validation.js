import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const REQUIRED_FILE_TYPE = [
  // "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

export const fileSchema = z
  .instanceof(File, {
    error: "Image is required",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    error: "Max file size is 5 MB",
  })
  .refine(
    (file) => {
      return REQUIRED_FILE_TYPE.includes(file.type);
    },
    {
      error: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    },
  );
