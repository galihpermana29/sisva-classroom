"use client";

import { useFilterStatus } from "./useFilterStatus";

export const useGetShowFilterStatus = () => {
  const { periode, prodi, tingkat } = useFilterStatus();
  const showProdi = Boolean(periode);
  const showGrade = Boolean(prodi);
  const showKelas = Boolean(tingkat);
  const showGuru = Boolean(prodi);

  return { showProdi, showGrade, showKelas, showGuru };
};
