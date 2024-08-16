"use client";

import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component for displaying the top level page actions such as exports and add new */
export const TabActions = () => {
  const {
    activeTab: { actions },
  } = useActiveInvoiceTab();
  return actions;
};
