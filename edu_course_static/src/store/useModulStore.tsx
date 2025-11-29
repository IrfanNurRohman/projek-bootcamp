// src/store/useModulStore.ts
import { create } from "zustand";

interface Modul {
  type: "pretest" | "video" | "summary" | "quiz";
  title: string;
  duration: string;
}

interface ModulState {
  selectedModul: Modul | null;
  setSelectedModul: (modul: Modul) => void;
}

export const useModulStore = create<ModulState>((set) => ({
  selectedModul: null,
  setSelectedModul: (modul) => set({ selectedModul: modul }),
}));
