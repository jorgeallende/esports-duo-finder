import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"
import React from "react";


const CreateAdBanner: any = () => {
  return (
    <div className="pt-1 mx-14 bg-nlw-gradient self-stretch  mt-8 rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] py-6 px-8 rounded-b-lg flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não enconstrou o seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <div>
          <Dialog.Trigger className="flex items-center gap-3 py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    </div>
  );
};

export default CreateAdBanner;
