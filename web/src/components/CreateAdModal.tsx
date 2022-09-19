import { useEffect, useState, FormEvent } from "react";
import { Check, GameController } from "phosphor-react";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import Input from "./Form/Input";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data);

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStat: data.hourStat,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio crado com sucesso!");
    } catch (err) {
      alert("Erro ao criar anúncio");
      console.log(err);
    }
  }

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-full h-full bg-black/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* <Dialog.Content className="pt-1 mx-14 bg-nlw-gradient self-stretch  mt-8 rounded-lg overflow-hidden">a</Dialog.Content> */}
      <Dialog.Content className="fixed rounded-lg bg-[#2A2634] p-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-nlw-gradient">
        <div className="bg-[#222] rounded-lg py-8 px-10">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="text-white font-semibold">
                Qual o game?
              </label>
              <select
                id="game"
                name="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o game que deseja jogar
                </option>

                {games.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Como te chamam dentro do jogo?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  type="text"
                  id="yearsPlaying"
                  name="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input
                  type="text"
                  id="discord"
                  name="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <ToggleGroup.Root
                  className="grid grid-cols-4 gap-2"
                  type="multiple"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStat">Qual horário do dia</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="hourStat"
                    type="time"
                    id="hourStat"
                    placeholder="De"
                  />
                  <Input
                    name="hourEnd"
                    type="time"
                    id="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 rounded p-1 bg-zinc-900"
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check className="h-4 w-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Dialog.Close>
              <button
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                type="submit"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CreateAdModal;
