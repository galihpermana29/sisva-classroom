"use client";

import { Fragment } from "react";
import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component to get and show top level component for each tab's filter */
export const TabFilters = () => {
  const {
    activeIndex,
    activeTab: { filters },
  } = useActiveInvoiceTab();
  return <Fragment key={`tab-filters-${activeIndex}`}>{filters}</Fragment>;
};
