"use client";

import { useSearchParams } from "next/navigation";

import { TAB_FIELD_NAME } from "@/components/TabSelector";

import { DEFAULT_INVOICE_TAB, INVOICE_TABS } from "../constants";
import { isValidInvoiceTab } from "../utils/isValidInvoiceTab";

/**
 * Get the current active tab from URL param, this is supposed to be used as a hook
 * @returns {{activeTab: {title: string, component: JSX.Element, actions: JSX.Element, search: JSX.Element, filters: JSX.Element}, activeIndex: number}} Returns the current active tab index and its corresponding tab, or DEFAULT_INVOICE_TAB index and its corresponding tab if URL param doesn't exist or if current tab URL param is not valid.
 */
export const useActiveInvoiceTab = () => {
  const searchParams = useSearchParams();
  const currentTabParam = searchParams.get(TAB_FIELD_NAME);

  const currentTab = Number(currentTabParam);
  const tabIsValid = isValidInvoiceTab(currentTab);

  const activeIndex = tabIsValid ? currentTab : DEFAULT_INVOICE_TAB;
  const activeTab = INVOICE_TABS[activeIndex];

  return { activeTab, activeIndex };
};
