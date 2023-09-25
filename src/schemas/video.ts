import { z } from "zod";

export const videoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  transcription: z.string().optional(),
  createdAt: z.date(),
});
