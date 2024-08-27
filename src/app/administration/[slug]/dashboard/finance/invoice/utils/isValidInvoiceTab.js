import { INVOICE_TABS } from "../constants";

/** Check is a given tab is a valid invoice tab
 * @param {number} tab Tab index to check it's validity
 * @returns {boolean} Whether the given tab index is valid or not
 */
export const isValidInvoiceTab = (tab) => {
  return Number.isInteger(tab) && INVOICE_TABS[tab] !== undefined;
};
