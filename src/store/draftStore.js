import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useDraftSettingsStore } from "./draftSettingsStore"
import { draftPicks, createRostersObject } from "../utils"

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
      rosters: createRostersObject(
        Number(useDraftSettingsStore.getState().teams)
      ),
      assignPlayer: (player, pick) =>
        set((state) => ({
          picks: state.picks.map((p, index) =>
            index === pick.overall - 1
              ? {
                  ...p,
                  player,
                }
              : p
          ),
          rosters: {
            ...state.rosters,
            [pick.team]: [...state.rosters[pick.team], { ...pick, player }],
          },
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
          rosters: createRostersObject(
            Number(useDraftSettingsStore.getState().teams)
          ),
        })),
    }),
    {
      name: "FPG_DRAFT",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          const { newDraft } = useDraftStore.getState()
          newDraft()
        }

        return persistedState
      },
    }
  )
)
