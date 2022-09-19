import { MouseEvent } from "react";

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
    id: string;
    callback: (id: string) => void;
}

const GameBanner = (props: GameBannerProps) => {

  function handleGameClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    props.callback(props.id)
  }

  return (
    <div onClick={() => props.callback(props.id)} className="relative object-cover h-full w-full rounded-lg overflow-hidden cursor-pointer">
      <img src={props.bannerUrl} className="w-full h-full" alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">
          {props.title}
        </strong>
        <span className="text-zinc-300 text-sm block">{props.adsCount} anúncio(s)</span>
      </div>
    </div>
  );
};

export default GameBanner;
