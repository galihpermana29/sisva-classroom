"use client";

import { FinanceAPI } from "@/api/finance";
import { useQuery } from "@tanstack/react-query";

export const useGetBillById = (id) => {
  const { data, ...query } = useQuery({
    queryKey: ["bill", { id }],
    queryFn: () => FinanceAPI.getBillById(id),
    enabled: id !== null && id !== undefined,
  });

  const queryData = data ? data.data.data : undefined;
  return { data: queryData, ...query };
};
