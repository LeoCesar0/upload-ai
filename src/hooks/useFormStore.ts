import { UploadedVideo } from "@/@types";
import { create } from "zustand";

type ZustandSet<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>)
) => void;

export type VideoFormStatusType =
  | "waiting"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

export type VideoFormStatus = {
  name: VideoFormStatusType;
  label: string;
};

export interface IFormStore {
  prompt: string;
  transcriptionPrompt: string;
  result: string;
  model: string;
  temperature: number;
  videoFile: File | null;
  uploadedVideo: UploadedVideo | null;
  videoFormStatus: VideoFormStatus;
  onResetFunctions: (() => void)[];
  set: ZustandSet<IFormStore>;
  resetForm: () => void;
}

export const videoInputFormStatus: {
  [key in VideoFormStatusType]: VideoFormStatus;
} = {
  waiting: {
    name: "waiting",
    label: "Aguardando...",
  },
  converting: {
    name: "converting",
    label: "Convertendo Áudio...",
  },
  uploading: {
    name: "uploading",
    label: "Enviando...",
  },
  generating: {
    name: "generating",
    label: "Gerando Transcrição...",
  },
  success: {
    name: "success",
    label: "Sucesso!",
  },
  error: {
    name: "error",
    label: "Erro!",
  },
};

const initialState = {
  prompt: "",
  transcriptionPrompt: "",
  result: "",
  model: "",
  temperature: 0.5,
  uploadedVideo: null,
  videoFile: null,
  videoFormStatus: videoInputFormStatus.waiting,
  onResetFunctions: [],
};

export const useFormStore = create<IFormStore>((set) => ({
  ...initialState,
  set,
  resetForm: () => {
    set((state) => {
      state.onResetFunctions.forEach((func) => {
        func();
      });
      return {
        ...state,
        ...initialState,
      };
    });
  },
}));
