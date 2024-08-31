import { create } from "zustand";

interface ScrollState {
  showLogo: boolean;
  setShowLogo: (show: boolean) => void;
  showSideBar: boolean;
  setShowSideBar: (show: boolean) => void;
}

const useStore = create<ScrollState>((set) => ({
  showLogo: false,
  setShowLogo: (show) => set({ showLogo: show }),
  showSideBar: false,
  setShowSideBar: (value) => set({ showSideBar: value }),
}));

export default useStore;
