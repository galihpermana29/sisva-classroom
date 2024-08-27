"use client";

import { TabsSelector } from "@/components/TabSelector";
import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";
import { INVOICE_TABS } from "../../constants";

/** @description Component to display tab selector */
export const InvoiceTabs = () => {
  const { activeIndex } = useActiveInvoiceTab();
  return (
    <TabsSelector
      key={`invoice-tabs-${activeIndex}`}
      tabs={INVOICE_TABS}
      activeTab={activeIndex}
    />
  );
};
