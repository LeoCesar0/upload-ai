import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { GITHUB_LINK } from "@/static/appConfig";
import { useT } from "@/hooks/useT";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  return (
    <>
      <header className="px-6 py-3 flex items-center justify-between border-b ">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {useT({
              pt: "Desenvolvido com ❤ por Leonardo César",
              en: "Made with ❤ by Leonardo César",
            })}
          </span>
          <Separator orientation="vertical" className="h-6" />

          <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant={"outline"}>
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </a>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
};

export default Header;
