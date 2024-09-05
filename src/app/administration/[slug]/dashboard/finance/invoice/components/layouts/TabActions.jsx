"use client";

import { Fragment } from "react";
import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component for displaying the top level page actions such as exports and add new */
export const TabActions = () => {
  const {
    activeIndex,
    activeTab: { actions },
  } = useActiveInvoiceTab();
  return <Fragment key={`tab-actions-${activeIndex}`}>{actions}</Fragment>;
};
