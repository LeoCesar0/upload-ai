import { promptSchema } from "@/schemas/prompt";
import { videoSchema } from "@/schemas/video";
import { z } from "zod";

export enum Language {
  pt = "pt",
  en = "en",
}

export type UploadedVideo = z.infer<typeof videoSchema>;

export type Prompt = z.infer<typeof promptSchema>;
