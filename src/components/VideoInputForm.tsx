import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { fetchFile } from "@ffmpeg/util";
import { getFFMPEG } from "@/lib/ffmpeg";
import { axiosAPI } from "@/lib/axios";

type StatusType =
  | "waiting"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

type Status = {
  name: StatusType;
  label: string;
};

const VideoInputForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>(allStatus.waiting);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const onInputVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files || !files[0]) return;

    const file = files[0];
    setVideoFile(file);
  };

  const handleVideoUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!videoFile) return;

    try {
      const prompt = promptInputRef.current?.value || "";

      setStatus(allStatus.converting);
      const audioFile = await convertVideoToAudio(videoFile);

      const formData = new FormData();

      formData.append("file", audioFile);

      setStatus(allStatus.uploading);
      const response = await axiosAPI.post("/video", formData);

      console.log("response -->", response);

      const videoId = response.data.data.id;
      const transcriptionURL = `/video/${videoId}/transcription`;

      setStatus(allStatus.generating);
      const transcriptionResponse = await axiosAPI.post(transcriptionURL, {
        prompt,
      });
      const transcription = transcriptionResponse.data;

      setStatus(allStatus.success);

      console.log("transcriptionResponse -->", transcriptionResponse);
    } catch (err) {
      console.log("Something went wrong -->", err);
      setStatus(allStatus.error);
    }
  };

  const videoPreviewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <>
      <form className="space-y-6" onSubmit={handleVideoUpload}>
        <label
          htmlFor="video"
          className="border relative overflow-hidden flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary-foreground/5 transition-colors"
        >
          {videoPreviewURL ? (
            <>
              <video
                src={videoPreviewURL}
                controls={false}
                className="pointer-events-none absolute inset-0 aspect-video object-cover rounded-md"
              />
            </>
          ) : (
            <>
              <FileVideo className="w-4 h-4" />
              Carregar video
            </>
          )}
        </label>
        <input
          type="file"
          className="sr-only"
          accept="video/mp4"
          id="video"
          onChange={onInputVideo}
        />
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="transcriptionPrompt">Prompt de transcrição</Label>
          <Textarea
            disabled={status.name !== allStatus.waiting.name}
            ref={promptInputRef}
            id="transcriptionPrompt"
            className="h-20 leading-relaxed p-2 resize-none"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!videoFile || status.name !== allStatus.waiting.name}
          variant={
            status.name === allStatus.success.name
              ? "success"
              : status.name === allStatus.error.name
              ? "destructive"
              : "default"
          }
        >
          {status.name === allStatus.waiting.name ? (
            <>
              Enviar vídeo
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>{status.label}</>
          )}
        </Button>
      </form>
    </>
  );
};

export default VideoInputForm;

const allStatus: {
  [key in StatusType]: Status;
} = {
  waiting: {
    name: "waiting",
    label: "Aguardando...",
  },
  converting: {
    name: "converting",
    label: "Convertendo Áudio...",
  },
  uploading: {
    name: "uploading",
    label: "Enviando...",
  },
  generating: {
    name: "generating",
    label: "Gerando Transcrição...",
  },
  success: {
    name: "success",
    label: "Sucesso!",
  },
  error: {
    name: "error",
    label: "Erro!",
  },
};

const convertVideoToAudio = async (file: File) => {
  console.log("Start converting");

  const ffmpeg = await getFFMPEG();

  await ffmpeg.writeFile("input.mp4", await fetchFile(file));

  ffmpeg.on("progress", (progress) => {
    const percentage = Math.round(progress.progress * 100);
    console.log("Convert Progress: " + percentage);
  });
  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-map",
    "0:a",
    "-b:a",
    "20k",
    "-acodec",
    "libmp3lame",
    "output.mp3",
  ]);
  const data = await ffmpeg.readFile("output.mp3");
  const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
  const audioFile = new File([audioFileBlob], "audio.mp3", {
    type: "audio/mpeg",
  });
  console.log("Finish converting");
  return audioFile;
};
