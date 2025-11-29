// src/store/useTutorStore.ts
import { create } from "zustand";

interface Tutor {
  id: number | null;
  courseName: string;
  instructorName: string;
  instructorJob: string;
  instructorCompany: string;
  rating: number;
  reviewCount: number;
  price: string;
  [key: string]: any;
}

interface TutorState {
  tutors: Tutor[];
  selectedTutor: Tutor | null;
  setTutors: (data: Tutor[]) => void;
  setSelectedTutor: (tutor: Tutor) => void;
}

export const useTutorStore = create<TutorState>((set) => ({
  tutors: [],
  selectedTutor: null,
  setTutors: (data) => set({ tutors: data }),
  setSelectedTutor: (tutor) => set({ selectedTutor: tutor }),
}));
