"use client";

import { paginateData } from "@/utils/paginateData";

import useFilteredInvoices from "../../hooks/useFilteredInvoices";
import { usePagination } from "../../hooks/usePagination";
import { Paginations } from "../paginations";

export const InvoicePagination = () => {
  const { rowsPerPage } = usePagination();

  const filteredInvoices = useFilteredInvoices();
  const paginatedInvoices = paginateData(filteredInvoices, rowsPerPage);

  const totalPage =
    paginatedInvoices.length === 0 ? 1 : paginatedInvoices.length;

  return <Paginations totalPage={totalPage} />;
};
