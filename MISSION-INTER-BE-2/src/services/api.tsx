// src/services/api.tsx
import axios from "axios";

const API_URL = "https://mocki.io/v1/42a35b6f-6314-47d9-bc30-267a4833225d"; // mock API kamu

// Ambil semua course
export const getAllTutors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data tutor:", error);
    throw error;
  }
};

// Ambil course berdasarkan ID
export const getTutorById = async (id: number) => {
  try {
    const response = await axios.get(API_URL);
    const tutors = response.data;
    const tutor = tutors.find((t: any) => t.id === id);
    return tutor || null;
  } catch (error) {
    console.error("❌ Gagal mengambil detail tutor:", error);
    throw error;
  }
};
