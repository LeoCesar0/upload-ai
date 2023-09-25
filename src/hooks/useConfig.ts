import { Language } from "@/@types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseConfig {
  currentLanguage: Language;
  set: ZustandSet<IUseConfig>;
}

const useConfig = create<IUseConfig>()(
  persist(
    (set) => ({
      currentLanguage: Language.en,
      set,
    }),
    {
      name: "nlw-ai-config",
    }
  )
);

export default useConfig;
