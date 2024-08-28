import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { DEFAULT_SETTINGS } from "../data/settings_data"

export const useDraftSettingsStore = create(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      rounds: Object.values(DEFAULT_SETTINGS.roster).reduce(
        (sum, value) => sum + Number(value),
        0
      ),
      updateSettings: (newSettings) =>
        set((state) => {
          const updatedState = { ...state, ...newSettings }
          updatedState.rounds = Object.values(updatedState.roster).reduce(
            (sum, value) => sum + Number(value),
            0
          )
          return updatedState
        }),
      theme: "light",
      changeTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "FPG_SETTINGS",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          return {
            ...persistedState,
            roster: { ...DEFAULT_SETTINGS.roster },
          }
        }

        return persistedState
      },
    }
  )
)
