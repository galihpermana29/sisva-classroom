"use client";

import { useFilterStatus } from "./useFilterStatus";
import { useGetInvoiceById } from "./useGetInvoiceById";

export const useCheckStatusFilter = (invoice_id) => {
  const { status } = useFilterStatus();
  const { data } = useGetInvoiceById(invoice_id);
  return data && status ? data.status === status : true;
};
