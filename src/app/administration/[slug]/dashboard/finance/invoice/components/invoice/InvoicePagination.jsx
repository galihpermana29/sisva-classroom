"use client";

import { useMounted } from "@mantine/hooks";
import { Paginations } from "../paginations";
import { useGetAllInvoices } from "../../hooks/useGetAllInvoices";

export const InvoicePagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetAllInvoices();

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
