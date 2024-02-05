import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useDraftSettingsStore } from "./draftSettingsStore";

export const useDraftStore = create(
  persist(
    (set) => ({
      draftState: useDraftSettingsStore.getState(),
      updateDraftSettings: (newSettings) =>
        set(() => ({
          draftSettings: newSettings,
        })),
    }),
    {
      name: "FPG_DRAFT",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
