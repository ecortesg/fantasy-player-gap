import { create } from "zustand";

export const useDashboardSettingsStore = create((set) => ({
  isModalOpen: false,
  updateIsModalOpen: (newState) =>
    set(() => ({
      isModalOpen: newState,
    })),
  roster: 1,
  updateRoster: (newState) =>
    set(() => ({
      roster: newState,
    })),
}));
