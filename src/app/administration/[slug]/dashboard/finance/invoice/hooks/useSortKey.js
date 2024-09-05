"use client";

import { useSearchParams } from "next/navigation";

export const SORT_PARAM_NAME = "sort";

export const useSortKey = () => {
  const searchParams = useSearchParams();
  const sortKeys = searchParams.get(SORT_PARAM_NAME)?.split(",") ?? [];
  return sortKeys;
};
