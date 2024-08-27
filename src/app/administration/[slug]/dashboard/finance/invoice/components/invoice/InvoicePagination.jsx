"use client";

import { useMounted } from "@mantine/hooks";
import { Paginations } from "../paginations";
import { useGetAllInvoices } from "../../hooks/useGetAllInvoices";

export const InvoicePagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetAllInvoices({ paginated: true });

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
