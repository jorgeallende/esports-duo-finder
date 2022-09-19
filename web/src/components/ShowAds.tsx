import React, { useEffect, useState } from "react";
import axios from "axios";
import AdInfoModel from "./AdInfoModel";
import { GameController } from "phosphor-react";
import GameBanner from "./GameBanner";
import * as Dialog from "@radix-ui/react-dialog";
import ShowDiscord from "./ShowDiscord";

interface AdsProps {
  id: string;
  name: string;
  yearsPlaying: string;
  hourStat: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  discord: string;
}

interface ShowAdProps {
  game: string;
}

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount?: number;
  id: string;
  callback?: (id: string) => void;
}

const ShowAds = (props: ShowAdProps) => {
  const [ads, setAds] = useState<AdsProps[]>([]);
  const [game, setGame] = useState<GameBannerProps>({
    bannerUrl: "",
    title: "",
    adsCount: 0,
    id: "",
  });

  console.log(ads);

  useEffect(() => {
    axios(`http://localhost:3333/games/${props.game}/ads`).then((response) => {
      setAds(response.data);
    });
  }, []);

  useEffect(() => {
    axios(`http://localhost:3333/games/${props.game}`).then((response) => {
      setGame(response.data);
    });
  }, []);

  return (
    <div>
      {ads.length == 0 ? (
        <div className="text-3xl text-zinc-500 w-full font-semibold mt-6">
          <span>Ainda não há anúncios para esse jogo</span>
        </div>
      ) : (
        <div className="grid grid-cols-5 w-full gap-4 mt-8">
          <div className="flex-1 h-full w-full  rounded-lg">
            <GameBanner
              title={game.title}
              bannerUrl={game?.bannerUrl}
              id={game.id}
              callback={() => {}}
              adsCount={Number(game.adsCount)}
            />
          </div>
          {ads.map((ad) => (
            <div className="py-8 px-6 rounded-md bg-[#2A2634] flex flex-col gap-4 w-64">
              <AdInfoModel title="Nome" subtitle={ad.name} />
              <AdInfoModel title="Tempo de jogo" subtitle={ad.yearsPlaying} />
              <AdInfoModel
                title="Disponibilidade"
                subtitle={`${ad.weekDays.length} dias \u2022 `}
              />
              <AdInfoModel
                title="Chamada de audio?"
                subtitle={ad.useVoiceChannel ? "Sim" : "Não"}
                customColor={
                  ad.useVoiceChannel ? "text-emerald-500" : "text-red-500"
                }
              />
              <Dialog.Root>
                <Dialog.Trigger className="text-white flex items-center gap-4 font-bold justify-center bg-[#8B5CF6] py-2 rounded-md">
                  <GameController size={20} />
                  Conectar
                </Dialog.Trigger>
                <ShowDiscord discord={ad.discord}/>
              </Dialog.Root>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAds;
