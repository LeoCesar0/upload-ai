import { Language } from "@/@types";
import { create } from "zustand";

interface IUseConfig {
  currentLanguage: Language;
}

const useConfig = create<IUseConfig>((set) => ({
  currentLanguage: Language.en,
  set,
}));

export default useConfig;
