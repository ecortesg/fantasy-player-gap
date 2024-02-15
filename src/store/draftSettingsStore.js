import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "../data/settings_data";

export const useDraftSettingsStore = create(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: (newSettings) =>
        set((state) => ({ ...state, ...newSettings })),
      theme: "light",
      changeTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "FPG_SETTINGS",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
