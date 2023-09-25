import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchFile } from "@ffmpeg/util";
import { getFFMPEG } from "@/lib/ffmpeg";
import { axiosAPI } from "@/lib/axios";
import { UploadedVideo } from "@/@types";
import {
  VideoFormStatus,
  useFormStore,
  videoInputFormStatus,
} from "@/hooks/useFormStore";

const VideoInputForm = () => {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { set, videoFile, videoFormStatus, transcriptionPrompt } = useFormStore(
    (state) => state
  );

  const setStatus = (videoFormStatus: VideoFormStatus) => {
    set((state) => ({
      ...state,
      videoFormStatus: videoFormStatus,
    }));
  };

  const onInputVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files || !files[0]) {
      set((state) => ({
        ...state,
        videoFile: null,
      }));
      return;
    }

    const file = files[0];
    set((state) => ({
      ...state,
      videoFile: file,
    }));
  };

  const handleVideoUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!videoFile) return;

    try {
      setStatus(videoInputFormStatus.converting);
      const audioFile = await convertVideoToAudio(videoFile);

      const formData = new FormData();

      formData.append("file", audioFile);

      setStatus(videoInputFormStatus.uploading);
      const response = await axiosAPI.post("/video", formData);

      const uploadedVideo = response.data.data as UploadedVideo;

      const videoId = uploadedVideo.id;
      const transcriptionURL = `/video/${videoId}/transcription`;

      setStatus(videoInputFormStatus.generating);

      const transcriptionResponse = await axiosAPI.post(transcriptionURL, {
        prompt: transcriptionPrompt,
      });
      const transcription = transcriptionResponse.data;

      uploadedVideo.transcription = transcription;

      set((state) => ({
        ...state,
        uploadedVideo,
      }));

      setStatus(videoInputFormStatus.success);

      console.log("transcriptionResponse -->", transcriptionResponse);
    } catch (err) {
      console.log("Something went wrong -->", err);
      setStatus(videoInputFormStatus.error);
    }
  };

  const onInputVideoClicked = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
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
                className="pointer-events-none absolute inset-0 aspect-video rounded-md object-cover"
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
          ref={videoInputRef}
          onClick={onInputVideoClicked}
        />
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="transcriptionPrompt">Prompt de transcrição</Label>
          <Textarea
            disabled={
              videoFormStatus.name !== videoInputFormStatus.waiting.name
            }
            value={transcriptionPrompt}
            onChange={(event) => {
              set((state) => ({
                ...state,
                transcriptionPrompt: event.target.value,
              }));
            }}
            id="transcriptionPrompt"
            className="h-20 leading-relaxed p-2 resize-none"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={
            !videoFile ||
            videoFormStatus.name !== videoInputFormStatus.waiting.name
          }
          variant={
            videoFormStatus.name === videoInputFormStatus.success.name
              ? "success"
              : videoFormStatus.name === videoInputFormStatus.error.name
              ? "destructive"
              : "default"
          }
        >
          {videoFormStatus.name === videoInputFormStatus.waiting.name ? (
            <>
              Enviar vídeo
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>{videoFormStatus.label}</>
          )}
        </Button>
      </form>
    </>
  );
};

export default VideoInputForm;

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
