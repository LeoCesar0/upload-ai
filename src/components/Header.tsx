import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { GITHUB_LINK } from "@/static/appConfig";

const Header = () => {
  return (
    <>
      <header className="px-6 py-3 flex items-center justify-between border-b ">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com ❤ na NLW da Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"outline"} >
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
