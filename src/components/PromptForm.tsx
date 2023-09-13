import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const PromptForm = () => {
  return (
    <>
      <form className="space-y-6">
        <label
          htmlFor="video"
          className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary-foreground/5 transition-colors"
        >
          <FileVideo className="w-4 h-4" />
          Carregar video
        </label>
        <input type="file" className="sr-only" accept="video/mp4" id="video" />
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="transcriptionPrompt">Prompt de transcrição</Label>
          <Textarea
            id="transcriptionPrompt"
            className="h-20 leading-relaxed p-2 resize-none"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
          />
        </div>
        <Button type="submit" className="w-full">
          Carregar vídeo
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </>
  );
};


export default PromptForm