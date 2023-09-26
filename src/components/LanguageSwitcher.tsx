import useConfig from "@/hooks/useConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Language } from "@/@types";
import { LANGUAGES } from "@/static/appConfig";

const LanguageSwitcher = () => {
  const { currentLanguage, set } = useConfig();

  return (
    <>
      <Select
        defaultValue={currentLanguage}
        value={currentLanguage}
        onValueChange={(value) => {
          set((state) => ({
            ...state,
            currentLanguage: value as Language,
          }));
        }}
      >
        <SelectTrigger className="w-max">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((language) => {
            return (
              <SelectItem key={language} value={language}>
                {language.toUpperCase()}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default LanguageSwitcher;
