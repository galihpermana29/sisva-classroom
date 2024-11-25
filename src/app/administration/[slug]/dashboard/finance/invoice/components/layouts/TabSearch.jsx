"use client";

import { Fragment } from "react";

import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component to get and display top level search component for each tab */
export const TabSearch = () => {
  const {
    activeIndex,
    activeTab: { search },
  } = useActiveInvoiceTab();
  return <Fragment key={`tab-search-${activeIndex}`}>{search}</Fragment>;
};
