"use client";

import { useQuery } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

export const useGetInvoiceById = (id) => {
  const { data, ...query } = useQuery({
    queryKey: ["invoice", { id }],
    queryFn: () => FinanceAPI.getInvoiceById(id),
  });

  const queryData = data ? data.data.data : undefined;
  return { data: queryData, ...query };
};
