"use client";

import { useQuery } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

export const useGetBillById = (id) => {
  const { data, ...query } = useQuery({
    queryKey: ["bill", { id }],
    queryFn: () => FinanceAPI.getBillById(id),
    enabled: id === 0 || (id !== 0 && Boolean(id)),
  });

  const queryData = data ? data.data.data : undefined;
  return { data: queryData, ...query };
};
