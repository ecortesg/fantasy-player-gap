import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "../data/settings_data";

export const useDraftSettingsStore = create(
  persist(
    (set) => ({
      draftSettings: DEFAULT_SETTINGS,
      updateDraftSettings: (newSettings) =>
        set(() => ({
          draftSettings: newSettings,
        })),
    }),
    {
      name: "fpg_draft_settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
