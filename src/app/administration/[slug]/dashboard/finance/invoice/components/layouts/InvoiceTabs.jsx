"use client";

import { TAB_FIELD_NAME, TabsSelector } from "@/components/TabSelector";
import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";
import { CURRENT_PAGE_NAME, INVOICE_TABS } from "../../constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SORT_PARAM_NAME } from "../../hooks/useSortKey";

/** @description Component to display tab selector */
export const InvoiceTabs = () => {
  const { activeIndex } = useActiveInvoiceTab();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /** Reset/delete sort and page param on change tab */
  const createTabParamOnChange = useCallback(
    (tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(TAB_FIELD_NAME, tab);
      params.delete(SORT_PARAM_NAME);
      params.delete(CURRENT_PAGE_NAME);

      return params.toString();
    },
    [searchParams]
  );

  const onTabChange = (value) =>
    router.push(pathname + "?" + createTabParamOnChange(value));

  return (
    <TabsSelector
      key={`invoice-tabs-${activeIndex}`}
      tabs={INVOICE_TABS}
      activeTab={activeIndex}
      onChange={onTabChange}
    />
  );
};
