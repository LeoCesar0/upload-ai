import { Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import PromptSelect from "./PromptSelect";
import ModelSelect from "./ModelSelect";
import { useFormStore } from "../hooks/useFormStore";
import { useEffect, useMemo } from "react";
import { useCompletion } from "ai/react";
import { API_GENERATE_URL } from "@/static/appConfig";

const GenerationForm = () => {
  const { set, model, temperature, uploadedVideo, prompt, resetForm } =
    useFormStore((state) => state);
  const canGenerateText = Boolean(prompt && model && uploadedVideo);

  const { handleSubmit, completion, isLoading, error, setInput, stop } =
    useCompletion({
      api: API_GENERATE_URL,
      body: {
        videoId: uploadedVideo?.id,
        model,
        temperature,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleResetForm = () => {
    stop();
    resetForm();
  };

  const formFinished = useMemo(() => {
    return !isLoading && !error && completion && prompt;
  }, [isLoading, error, completion, prompt]);

  useEffect(() => {
    setInput(prompt);
  }, [prompt]);

  useEffect(() => {
    set((state) => ({
      ...state,
      result: completion,
    }));
  }, [completion]);

  useEffect(() => {
    console.log("Generating error -->", error);
  }, [error]);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <PromptSelect />
        </div>
        <Separator />
        <div className="space-y-2">
          <ModelSelect />
          <span className="block text-xs text-muted-foreground italic">
            Você poderá customizar essa opção em breve.
          </span>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label>Temperatura</Label>
          <div className="block !my-3">
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={([value]) => {
                set((state) => ({
                  ...state,
                  temperature: value,
                }));
              }}
            />
          </div>
          <span className="block text-xs text-muted-foreground italic">
            Valores mais altos tendem a gerar textos mais criativos, mas com
            possíveis erros.
          </span>
        </div>
        <Separator />
        {formFinished ? (
          <>
            <Button
              type="button"
              className="flex items-center gap-2 w-full"
              disabled={isLoading}
              isLoading={isLoading}
              variant={"outline"}
              onClick={() => {
                handleResetForm();
              }}
            >
              Reiniciar
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              className="flex items-center gap-2 w-full"
              disabled={!canGenerateText || isLoading}
              isLoading={isLoading}
            >
              Executar
              <Wand2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default GenerationForm;
