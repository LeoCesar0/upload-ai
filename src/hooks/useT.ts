import { Language } from "@/@types";
import useConfig from "./useConfig";

type IUseT = {
  [key in Language]: string;
};

export const useT = (texts: IUseT) => {
  const { currentLanguage } = useConfig();

  const text =
    texts[currentLanguage] || texts[Language.en] || texts[Language.pt] || "";

  return text;
};
