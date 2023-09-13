import { Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";

const DetailsForm = () => {
  return (
    <>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um prompt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Título do Youtube</SelectItem>
              <SelectItem value="description">Descrição do Youtube</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Modelo</Label>
          <Select defaultValue="gpt3.5" disabled>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt3.5">GPT 3.5 16k</SelectItem>
            </SelectContent>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            Você poderá customizar essa opção em breve.
          </span>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Temperatura</Label>
          <div className="block !my-3">
            <Slider min={0} max={1} step={0.1} />
          </div>
          <span className="block text-xs text-muted-foreground italic">
            Valores mais altos tendem a gerar textos mais criativos, mas com
            possíveis erros.
          </span>
        </div>
        <Separator />
        <Button type="submit" className="flex items-center gap-2 w-full">
          Executar
          <Wand2 className="w-4 h-4" />
        </Button>
      </form>
    </>
  );
};

export default DetailsForm;
