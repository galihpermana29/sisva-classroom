"use client";

import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";
import { paginateData } from "@/utils/paginateData";
import { FinanceAPI } from "@/api/finance";

export const useGetAllUserBill = ({ bill_id, paginated = false }) => {
  const { rowsPerPage } = usePagination();
  const { data, ...query } = useQuery({
    queryKey: ["user-bill", bill_id],
    queryFn: () => FinanceAPI.getAllUserBill({ bill_id }),
  });

  const queryData = data ? data.data.data : undefined;
  if (!paginated) {
    return { data: queryData, ...query };
  }

  const paginatedData = paginateData(queryData, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};
