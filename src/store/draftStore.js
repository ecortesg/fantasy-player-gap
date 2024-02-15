import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useDraftSettingsStore } from "./draftSettingsStore";
import { draftPicks } from "../utils";

export const useDraftStore = create(
  persist(
    (set) => ({
      counter: 0,
      increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
      decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
      selectedPlayers: [],
      addSelectedPlayer: (playerId) =>
        set((state) => ({
          selectedPlayers: [...state.selectedPlayers, playerId],
        })),
      removeSelectedPlayer: () =>
        set((state) => ({
          selectedPlayers: state.selectedPlayers.slice(0, -1),
        })),
      picks: draftPicks(useDraftSettingsStore.getState()),
      assignPlayer: (player, pick) =>
        set((state) => ({
          picks: state.picks.map((p, index) =>
            index === pick
              ? {
                  ...p,
                  player: player,
                }
              : p
          ),
        })),
      removePlayer: (pick) =>
        set((state) => ({
          picks: state.picks.map((p, index) =>
            index === pick
              ? {
                  ...p,
                  player: {},
                }
              : p
          ),
        })),
      newDraft: () =>
        set(() => ({
          counter: 0,
          selectedPlayers: [],
        })),
    }),
    {
      name: "FPG_DRAFT",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
