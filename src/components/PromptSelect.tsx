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

interface Prompt {
  id: string;
  title: string;
  template: string;
}

const PromptSelect = () => {
  const { set } = useFormStore((state) => state);

  const { data, isLoading } = useSWR<Prompt[]>("/prompts", (url) =>
    axiosAPI.get(url).then((res) => res.data)
  );

  return (
    <>
      <Label>Prompt</Label>
      <Select
        onValueChange={(value) => {
          set((state) => ({
            ...state,
            prompt: value,
          }));
        }}
      >
        <SelectTrigger disabled={isLoading || !data}>
          <SelectValue placeholder="Selecione um prompt" />
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
