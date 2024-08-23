"use client";

import { FinanceAPI } from "@/api/finance";
import { paginateData } from "@/utils/paginateData";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useFilterStatus } from "./useFilterStatus";
import { usePagination } from "./usePagination";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useGetTagihan = () => {
  const { tanggal, kategori, cari, status } = useFilterStatus();
  const { rowsPerPage } = usePagination();

  const getAllBills = async () => {
    const { data } = await FinanceAPI.getAllBills({});

    return data.data;
  };

  const { data: queryData, ...query } = useQuery({
    queryKey: ["tagihan", { tanggal, kategori }],
    queryFn: getAllBills,
  });

  const results = filterData(queryData, { tanggal, kategori, cari, status });
  const paginatedData = paginateData(results, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};

function isDateInRange(dateRange, dateStr) {
  const [startDateStr, endDateStr] = dateRange.split("-");

  const offset = dateStr.slice(-6);

  const startDate = dayjs(
    `${startDateStr} 00:00:00 ${offset}`,
    "DD/MM/YYYY HH:mm:ss Z"
  );
  const endDate = dayjs(
    `${endDateStr} 23:59:59 ${offset}`,
    "DD/MM/YYYY HH:mm:ss Z"
  );
  const dateToCheck = dayjs(dateStr, "DD/MM/YYYY h:mm A Z");

  return (
    dateToCheck.isSameOrAfter(startDate) && dateToCheck.isSameOrBefore(endDate)
  );
}

const filterData = (queryData, { tanggal, kategori, cari, status }) => {
  if (!queryData || queryData.length === 0) {
    return [];
  }

  return queryData.filter(
    (data) =>
      (cari ? data.name.toLowerCase().includes(cari.toLowerCase()) : true) &&
      (kategori ? data.name.toLowerCase() === kategori.toLowerCase() : true) &&
      (status ? data.status.toLowerCase() === status.toLowerCase() : true) &&
      (tanggal ? isDateInRange(tanggal, data.deadline) : true)
  );
};
