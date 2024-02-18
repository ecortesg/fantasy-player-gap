import { create } from "zustand";

export const useDashboardSettingsStore = create((set) => ({
  modal: "",
  updateModal: (newModal) =>
    set(() => ({
      modal: newModal,
    })),
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
  manualPick: {},
  updateManualPick: (newPick) =>
    set(() => ({
      manualPick: { ...newPick },
    })),
}));
