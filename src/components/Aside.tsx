import GenerationForm from "./GenerationForm";
import VideoInputForm from "./VideoInputForm";
import { Separator } from "./ui/separator";

const Aside = () => {
  return (
    <>
      <aside className="w-80 space-y-6 ">
        <VideoInputForm />
        <Separator />
        <GenerationForm />
      </aside>
    </>
  );
};

export default Aside;
