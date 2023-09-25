import { z } from "zod";

export const promptSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  template: z.string(),
});
