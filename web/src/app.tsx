import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { GameController, MagnifyingGlassPlus, ArrowLeft } from "phosphor-react";
import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Input from "./components/Form/Input";
import CreateAdModal from "./components/CreateAdModal";
import axios from "axios";
import ShowAds from "./components/ShowAds";
import { Arrow } from "@radix-ui/react-popover";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    console.log(selectedGame);
  }, [selectedGame]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center justify-center flex-col my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-[64px] text-white font-black mt-20">
        Seu
        <span className="bg-nlw-gradient bg-clip-text text-transparent ">
          {" "}
          duo{" "}
        </span>
        está aqui
      </h1>

      {/* JOGOS */}
      {selectedGame ? (
        <>
          <ShowAds game={selectedGame} />
          <button 
          onClick={() => setSelectedGame(null)}
          className="text-white flex items-center gap-4 font-bold justify-center bg-[#8B5CF6] py-2 px-10 mt-8 text-xl rounded-md">
            <ArrowLeft />
            Voltar
          </button>
        </>
      ) : (
        <div className="grid grid-cols-6 gap-6 mt-16">
          {games.map((game: Game) => {
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
                id={game.id}
                callback={setSelectedGame}
              />
            );
          })}
        </div>
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
