import { useEffect } from "react";
import { Textarea } from "./components/ui/textarea";
import Header from "./components/Header";
import Aside from "./components/Aside";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 gap-6 p-6">
        <section className="flex flex-1 flex-col gap-4">
          <div className="flex-1 grid grid-rows-2 gap-4 ">
            <Textarea placeholder="Inclua o prompt para a IA" />
            <Textarea placeholder="Resultado gerado pela IA" readOnly />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{" "}
            <code className="text-primary-foreground">{"{transcription}"}</code>{" "}
            no seu prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </section>
        <Aside />
      </main>
    </div>
  );
}

export default App;
