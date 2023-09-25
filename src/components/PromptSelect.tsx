import useSWR from "swr";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { axiosAPI } from "@/lib/axios";
import { useFormStore } from "@/hooks/useFormStore";
import { Prompt } from "@/@types";
import { useT } from "@/hooks/useT";

const PromptSelect = () => {
  const { set } = useFormStore((state) => state);

  const { data, isLoading } = useSWR<Prompt[]>("/prompts", (url) =>
    axiosAPI.get(url).then((res) => res.data)
  );

  return (
    <>
      <Label>Prompt Template <span className="text-muted-foreground" >({useT({
        pt: 'opcional',
        en: "optional"
      })})</span></Label>
      <Select
        onValueChange={(value) => {
          set((state) => ({
            ...state,
            prompt: value,
          }));
        }}
      >
        <SelectTrigger disabled={isLoading || !data}>
          <SelectValue
            placeholder={useT({
              pt: "Selecione um template",
              en: "Select a template",
            })}
          />
        </SelectTrigger>
        <SelectContent>
          {data?.map((item) => {
            return (
              <SelectItem key={item.id} value={item.template}>
                {item.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default PromptSelect;
