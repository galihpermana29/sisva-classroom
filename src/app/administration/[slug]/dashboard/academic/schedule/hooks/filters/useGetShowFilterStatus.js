"use client";

import { useFilterStatus } from "./useFilterStatus";

export const useGetShowFilterStatus = () => {
  const { periode, prodi } = useFilterStatus();
  const showProdi = Boolean(periode);
  const showGrade = Boolean(prodi);

  return { showProdi, showGrade };
};
