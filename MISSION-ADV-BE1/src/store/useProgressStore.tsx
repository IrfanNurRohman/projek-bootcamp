import { create } from "zustand";

interface ScoreData {
  score: number;
  correct: number;
  wrong: number;
  total: number;
  date: string;
}

interface ReviewData {
  rating: number;
  review: string;
}

interface ProgressStore {
  completedModules: string[];
  scores: Record<string, ScoreData | undefined>;
  reviewData?: ReviewData;
  completeModule: (moduleType: string, scoreData?: ScoreData) => void;
  resetProgress: () => void;
  setCompletedModules: (modules: string[]) => void;
  saveReview: (data: ReviewData) => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  completedModules: JSON.parse(localStorage.getItem("moduleProgress") || "[]"),
  scores: JSON.parse(localStorage.getItem("moduleScores") || "{}"),
  reviewData: JSON.parse(localStorage.getItem("moduleReview") || "null"),

  completeModule: (moduleType: string, scoreData?: ScoreData) => {
    const state = get();
    const already = state.completedModules.includes(moduleType);
    const updatedCompleted = already
      ? state.completedModules
      : [...state.completedModules, moduleType];

    const updatedScores = { ...state.scores };
    if (scoreData) updatedScores[moduleType] = scoreData;

    localStorage.setItem("moduleProgress", JSON.stringify(updatedCompleted));
    localStorage.setItem("moduleScores", JSON.stringify(updatedScores));

    set({ completedModules: updatedCompleted, scores: updatedScores });
  },

  resetProgress: () => {
    localStorage.removeItem("moduleProgress");
    localStorage.removeItem("moduleScores");
    localStorage.removeItem("moduleReview");
    set({ completedModules: [], scores: {}, reviewData: undefined });
  },

  setCompletedModules: (modules: string[]) => {
    localStorage.setItem("moduleProgress", JSON.stringify(modules));
    set({ completedModules: modules });
  },

  saveReview: (data: ReviewData) => {
    localStorage.setItem("moduleReview", JSON.stringify(data));
    set({ reviewData: data });
  },
}));
