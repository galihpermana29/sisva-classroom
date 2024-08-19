"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilterStatus } from "./useFilterStatus";
import { usePagination } from "./usePagination";
import { paginateData } from "@/utils/paginateData";

export const useGetTagihan = () => {
  const { tanggal, kategori, cari } = useFilterStatus();
  const { rowsPerPage } = usePagination();

  const { data: queryData, ...query } = useQuery({
    queryKey: ["tagihan", { tanggal, kategori }],
    queryFn: () => mock,
  });

  const results = filterData(queryData, { tanggal, kategori, cari });
  const paginatedData = paginateData(results, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};

const filterData = (queryData, { tanggal, kategori, cari }) => {
  if (!queryData || queryData.length === 0) {
    return [];
  }

  return queryData.filter((data) =>
    cari ? data.name.toLowerCase().includes(cari.toLowerCase()) : true
  );
};

const mock = [
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "draft",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "draft",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
  {
    id: "#101034711",
    name: "SPP januari",
    total_price: 300000,
    total_payment: "1000/1000",
    deadline: new Date(2024, 7, 10, 9, 0, 0),
    status: "published",
  },
];
