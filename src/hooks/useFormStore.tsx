import { UploadedVideo } from "@/@types";
import { create } from "zustand";

type ZustandSet<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>)
) => void;

interface IFormStore {
  prompt: string;
  result: string;
  model: string;
  temperature: number;
  uploadedVideo: UploadedVideo | null;
  set: ZustandSet<IFormStore>;
}

export const useFormStore = create<IFormStore>((set) => ({
  prompt: "",
  result: "",
  model: "",
  temperature: 0.5,
  uploadedVideo: null,
  set,
}))
