"use client";

import { useMounted } from "@mantine/hooks";
import { Paginations } from "../paginations";
import { useGetInvoice } from "../../hooks/useGetInvoice";

export const InvoicePagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetInvoice();

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
