"use client";

import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component to get and show top level component for each tab's filter */
export const TabFilters = () => {
  const {
    activeTab: { filters },
  } = useActiveInvoiceTab();
  return filters;
};
