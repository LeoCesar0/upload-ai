import { Language, UploadedVideo } from "@/@types";
import { create } from "zustand";

export type VideoFormStatusType =
  | "waiting"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

export type VideoFormStatus = {
  name: VideoFormStatusType;
  label: {
    [key in Language]: string;
  };
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
    label: {
      pt: "Aguardando...",
      en: "Waiting...",
    },
  },
  converting: {
    name: "converting",
    label: {
      pt: "Convertendo Áudio...",
      en: "Converting Audio...",
    },
  },
  uploading: {
    name: "uploading",
    label: {
      pt: "Enviando...",
      en: "Uploading...",
    },
  },
  generating: {
    name: "generating",
    label: {
      pt: "Gerando Transcrição...",
      en: "Generating Transcription...",
    },
  },
  success: {
    name: "success",
    label: {
      pt: "Sucesso!",
      en: "Success!",
    },
  },
  error: {
    name: "error",
    label: {
      pt: "Erro!",
      en: "Error!",
    },
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
