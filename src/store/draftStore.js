import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useDraftSettingsStore } from "./draftSettingsStore"
import { draftPicks } from "../utils"

export const useDraftStore = create(
  persist(
    (set) => ({
      selectedPlayers: [],
      addSelectedPlayer: (playerId) =>
        set((state) => ({
          selectedPlayers: [...state.selectedPlayers, playerId],
        })),
      removeSelectedPlayer: (playerId) =>
        set((state) => ({
          selectedPlayers: state.selectedPlayers.filter(
            (id) => id !== playerId
          ),
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
      removePlayer: (pick) => {
        set((state) => ({
          picks: state.picks.map((p, index) =>
            index === pick
              ? {
                  ...p,
                  player: {},
                }
              : p
          ),
        }))
      },
      newDraft: () =>
        set(() => ({
          selectedPlayers: [],
          picks: draftPicks(useDraftSettingsStore.getState()),
        })),
    }),
    {
      name: "FPG_DRAFT",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
