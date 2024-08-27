"use client";

import { useGetAllBills } from "../../../hooks/useGetAllBills";
import { KategoriSelect } from "../KategoriSelect";

export const InvoiceKategoriFilter = () => {
  const { data: bills } = useGetAllBills();
  const data = bills
    ? bills
        // .filter((bill) => bill.status === "published")
        .map((bill) => ({ value: bill.id, label: bill.name }))
    : [];

  return <KategoriSelect data={data} />;
};
