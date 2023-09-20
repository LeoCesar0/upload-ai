import DetailsForm from "./DetailsForm";
import VideoInputForm from "./VideoInputForm";
import { Separator } from "./ui/separator";

const Aside = () => {
  return (
    <>
      <aside className="w-80 space-y-6 ">
        <VideoInputForm />
        <Separator />
        <DetailsForm />
      </aside>
    </>
  );
};

export default Aside;
