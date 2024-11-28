"use client";

import { useBills } from "@/hooks/query/finance/useBills";

import { KategoriSelect } from "../KategoriSelect";

export const InvoiceKategoriFilter = () => {
  const { data: bills } = useBills();
  return (
    <KategoriSelect
      data={bills.map((bill) => ({ value: bill.id, label: bill.name }))}
    />
  );
};
