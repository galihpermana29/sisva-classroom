"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { useSearchParams } from "next/navigation";

const DEFAULT_TAB_PARAM_NAME = "tab";
const DEFAULT_TAB_FALLBACK = 0;

export const useActiveTab = (fallback, name) => {
  const tabParamName = name ?? DEFAULT_TAB_PARAM_NAME;
  const tabFallback = fallback ?? DEFAULT_TAB_FALLBACK;

  const { updateQueryParam } = useQueryParam();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get(tabParamName) ?? tabFallback;

  const changeTab = (value) => updateQueryParam(tabParamName, value);

  return { activeTab, changeTab };
};
