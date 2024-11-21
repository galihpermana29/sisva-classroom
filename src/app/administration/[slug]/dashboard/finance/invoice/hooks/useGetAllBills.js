"use client";

import FinanceAPI from "@/api/finance";
import { paginateData } from "@/utils/paginateData";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "./usePagination";

export const useGetAllBills = (props) => {
  const { rowsPerPage } = usePagination();
  const { data, ...query } = useQuery({
    queryKey: ["bills"],
    queryFn: () => FinanceAPI.getAllBills({ bill_id: null }),
  });

  const queryData = data ? data.data.data : undefined;
  if (!props?.paginated) {
    return { data: queryData, ...query };
  }

  const paginatedData = paginateData(queryData, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};
