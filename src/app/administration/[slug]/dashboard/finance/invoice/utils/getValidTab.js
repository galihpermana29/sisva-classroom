import { DEFAULT_INVOICE_TAB, INVOICE_TABS } from "../constants";
import { isValidInvoiceTab } from "./isValidInvoiceTab";

/** Check if given tab index is valid, and return the given index and its corresponding invoice tab . If it isn't a valid index, return default tab's index and its corresponding tab
 * @param {number | string} tab Current tab index which can be obtained from URL param
 * @returns {{activeTab: {title: string, component: JSX.Element, actions: JSX.Element, search: JSX.Element, filters: JSX.Element}, activeIndex: number}} Valid invoice tab if given tab index is valid, else default tab
 */
export const getValidTab = (tab) => {
  const tabIsValid = isValidInvoiceTab(Number(tab));

  const activeIndex = tabIsValid ? tab : DEFAULT_INVOICE_TAB;
  const activeTab = INVOICE_TABS[activeIndex];

  return { activeIndex, activeTab };
};
