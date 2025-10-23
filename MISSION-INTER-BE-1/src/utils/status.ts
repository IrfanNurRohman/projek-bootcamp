// utils/status.ts
export type StatusType = "Berhasil" | "Gagal" | "Pending";

export const isValidStatus = (s: string): s is StatusType =>
  ["Berhasil", "Gagal", "Pending"].includes(s);