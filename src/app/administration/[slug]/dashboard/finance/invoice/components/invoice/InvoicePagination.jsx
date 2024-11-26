"use client";

import usePaginatedFilteredInvoices from "../../hooks/usePaginatedFilteredInvoices";
import { Paginations } from "../paginations";

export const InvoicePagination = () => {
  const { totalPage } = usePaginatedFilteredInvoices();

  return <Paginations totalPage={totalPage} />;
};
