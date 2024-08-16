"use client";

import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component to get and display top level search component for each tab */
export const TabSearch = () => {
  const {
    activeTab: { search },
  } = useActiveInvoiceTab();
  return search;
};
