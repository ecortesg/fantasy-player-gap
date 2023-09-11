import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useDraftSettingsStore } from "./draftSettingsStore";

// export const useDraftStateStore = create(
//   persist(
//     (set) => ({
//       draftState: useDraftSettingsStore.getState().;,
//       updateDraftSettings: (newSettings) =>
//         set(() => ({
//           draftSettings: newSettings,
//         })),
//     }),
//     {
//       name: "fpg_draft_state",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
