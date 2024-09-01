import { create } from "zustand"

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
  manualPick: {},
  updateManualPick: (newPick) =>
    set(() => ({
      manualPick: { ...newPick },
    })),
}))
