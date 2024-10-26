"use client";

import { FinanceAPI } from "@/api/finance";
import { paginateData } from "@/utils/paginateData";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useSearchParams } from "next/navigation";
import { useFilterStatus } from "./useFilterStatus";
import { usePagination } from "./usePagination";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useGetTagihan = () => {
  const { tanggal, kategori, cari, status } = useFilterStatus();
  const { rowsPerPage } = usePagination();

  const searchParams = useSearchParams();
  const sortKeys = searchParams.get("sort")?.split(",") ?? [];

  const getAllBills = async () => {
    const { data } = await FinanceAPI.getAllBills({});

    return data.data;
  };

  const { data: queryData, ...query } = useQuery({
    queryKey: ["tagihan", { tanggal, kategori, status, cari, sortKeys }],
    queryFn: getAllBills,
  });

  const results = filterData(queryData, {
    tanggal,
    kategori,
    cari,
    status,
    sortKeys,
  });
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

const filterData = (
  queryData,
  { tanggal, kategori, cari, status, sortKeys }
) => {
  if (!queryData || queryData.length === 0) {
    return [];
  }

  const filteredData = queryData.filter(
    (data) =>
      (cari ? data.name.toLowerCase().includes(cari.toLowerCase()) : true) &&
      (kategori ? data.name.toLowerCase() === kategori.toLowerCase() : true) &&
      (status ? data.status.toLowerCase() === status.toLowerCase() : true) &&
      (tanggal ? isDateInRange(tanggal, data.deadline) : true)
  );

  return sortData(filteredData, sortKeys);
};

function parseDate(dateString) {
  const format = "DD/MM/YYYY h:mm A Z";
  const date = dayjs(dateString, format);
  return date.isValid() ? date : dayjs();
}

function sortData(data, fields) {
  return data.sort((a, b) => {
    for (const field of fields) {
      let comparison = 0;

      switch (field) {
        case "id":
          comparison = a?.custom_id.localeCompare(b?.custom_id); // ascending order
          break;
        case "amount":
          comparison = b.amount - a.amount; // descending order
          break;
        case "deadline":
          const dateA = parseDate(a.deadline);
          const dateB = parseDate(b.deadline);
          comparison = dateA - dateB; // ascending orderc
          break;
        case "status":
          comparison = a.status.localeCompare(b.status); // ascending order
          break;
        case "name":
          comparison = a.name.localeCompare(b.name); // ascending order
          break;
        default:
          break;
      }

      if (comparison !== 0) return comparison;
    }
    return 0;
  });
}
