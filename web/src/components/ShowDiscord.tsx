import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react"
import { CheckCircle } from "phosphor-react";
import axios from "axios";

interface Ad{
  discord: string;
}

const ShowDiscord = (props: Ad) => {
  const [discord, setDiscord] = useState<string>("");

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-full h-full bg-black/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Dialog.Content className="fixed rounded-lg bg-[#2A2634] w-[400px] p-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-nlw-gradient">
        <div className="bg-[#222] rounded-lg py-12 px-10 flex flex-col items-center ">
          <CheckCircle size={98} className="text-emerald-400" />
          <div className="flex flex-col items-center gap-1 mt-6">
            <Dialog.Title className="text-2xl font-black">
              Let's play!
            </Dialog.Title>
            <Dialog.Description className="text-zinc-400 text-base">
              Agora é só começar a jogar!
            </Dialog.Description>
          </div>
          <div className="flex flex-col gap-3 items-center w-full mt-10">
            <span className="text-white text-xl font-black">
              Adicione no Discord
            </span>
            <div className="bg-zinc-900 w-full text-center py-4 rounded-lg">
              <span>{props.discord}</span>
            </div>
            <Dialog.Close className="bg-violet-500 px-5 h-12 rounded-lg font-semibold w-full flex justify-center items-center gap-3 hover:bg-violet-600">
              <span>Voltar</span>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default ShowDiscord;
