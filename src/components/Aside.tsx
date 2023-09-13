import DetailsForm from "./DetailsForm";
import PromptForm from "./PromptForm";
import { Separator } from "./ui/separator";

const Aside = () => {
  return (
    <>
      <aside className="w-80 space-y-6 ">
        <PromptForm />
        <Separator />
        <DetailsForm />
      </aside>
    </>
  );
};

export default Aside;
