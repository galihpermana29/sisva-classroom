"use client";

import { useMounted } from "@mantine/hooks";

import { useGetAllInvoices } from "../../hooks/useGetAllInvoices";
import { Paginations } from "../paginations";

export const InvoicePagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetAllInvoices({ paginated: true });

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
