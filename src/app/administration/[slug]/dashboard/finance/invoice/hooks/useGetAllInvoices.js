"use client";

import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";
import { FinanceAPI } from "@/api/finance";
import { paginateData } from "@/utils/paginateData";

export const useGetAllInvoices = ({ bill_id, user_id, paginated = false }) => {
  const { rowsPerPage } = usePagination();
  const { data, ...query } = useQuery({
    queryKey: ["invoices", { user_id, bill_id }],
    queryFn: () => FinanceAPI.getAllInvoices({ user_id, bill_id }),
  });

  const queryData = data ? data.data.data : undefined;

  if (!paginated) {
    return { data: queryData, ...query };
  }

  const paginatedData = paginateData(queryData, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};
