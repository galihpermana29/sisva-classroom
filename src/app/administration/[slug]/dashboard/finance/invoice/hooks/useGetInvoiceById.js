"use client";

import FinanceAPI from "@/api/finance";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoiceById = (id) => {
  const { data, ...query } = useQuery({
    queryKey: ["invoice", { id }],
    queryFn: () => FinanceAPI.getInvoiceById(id),
  });

  const queryData = data ? data.data.data : undefined;
  return { data: queryData, ...query };
};
