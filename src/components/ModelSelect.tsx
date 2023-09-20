import { useFormStore } from "@/hooks/useFormStore";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect } from "react";

const ModelSelect = () => {
  const { set } = useFormStore((state) => state);

  const data = [
    {
      label: "GPT 3.5 16K",
      value: "gpt-3.5-turbo-16k",
    },
  ];
  const defaultItem = data[0];

  useEffect(() => {
    set((state) => ({
      ...state,
      model: defaultItem.value,
    }));
  }, []);

  return (
    <>
      <Label>Modelo</Label>
      <Select
        defaultValue={defaultItem.value}
        disabled
        onValueChange={(value) => {
          set((state) => ({
            ...state,
            model: value,
          }));
        }}
      >
        <SelectTrigger disabled={!data}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {data?.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default ModelSelect;
