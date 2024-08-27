"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilterStatus } from "./useFilterStatus";
import { usePagination } from "./usePagination";
import { paginateData } from "@/utils/paginateData";

export const useGetTagihanPengguna = () => {
  const { tanggal, kategori, cari } = useFilterStatus();
  const { rowsPerPage } = usePagination();

  const { data: queryData, ...query } = useQuery({
    queryKey: ["tagihan-pengguna", { tanggal, kategori }],
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
    date: "30 Nov 2022",
    name: "Bimo Arsa",
    payment: "SPP Januari",
    total_price: 300000,
    total_payment: 300000,
  },
  {
    id: "#101034712",
    date: "15 Dec 2022",
    name: "Dewi Lestari",
    payment: "SPP Februari",
    total_price: 350000,
    total_payment: 350000,
  },
  {
    id: "#101034713",
    date: "05 Jan 2023",
    name: "Arif Pratama",
    payment: "SPP Maret",
    total_price: 320000,
    total_payment: 320000,
  },
  {
    id: "#101034714",
    date: "20 Jan 2023",
    name: "Citra Dewi",
    payment: "SPP April",
    total_price: 340000,
    total_payment: 340000,
  },
  {
    id: "#101034715",
    date: "10 Feb 2023",
    name: "Eko Susilo",
    payment: "SPP Mei",
    total_price: 300000,
    total_payment: 300000,
  },
  {
    id: "#101034716",
    date: "25 Feb 2023",
    name: "Fahmi Setiawan",
    payment: "SPP Juni",
    total_price: 330000,
    total_payment: 330000,
  },
  {
    id: "#101034717",
    date: "10 Mar 2023",
    name: "Gita Putri",
    payment: "SPP Juli",
    total_price: 310000,
    total_payment: 310000,
  },
  {
    id: "#101034718",
    date: "25 Mar 2023",
    name: "Hana Wijaya",
    payment: "SPP Agustus",
    total_price: 350000,
    total_payment: 350000,
  },
  {
    id: "#101034719",
    date: "10 Apr 2023",
    name: "Iwan Setyawan",
    payment: "SPP September",
    total_price: 300000,
    total_payment: 300000,
  },
  {
    id: "#101034720",
    date: "25 Apr 2023",
    name: "Joko Santoso",
    payment: "SPP Oktober",
    total_price: 320000,
    total_payment: 320000,
  },
  {
    id: "#101034721",
    date: "10 May 2023",
    name: "Kartika Sari",
    payment: "SPP November",
    total_price: 340000,
    total_payment: 340000,
  },
  {
    id: "#101034722",
    date: "25 May 2023",
    name: "Lia Anggraeni",
    payment: "SPP Desember",
    total_price: 330000,
    total_payment: 330000,
  },
  {
    id: "#101034723",
    date: "10 Jun 2023",
    name: "Mia Farida",
    payment: "SPP Januari",
    total_price: 310000,
    total_payment: 310000,
  },
  {
    id: "#101034724",
    date: "25 Jun 2023",
    name: "Nina Sari",
    payment: "SPP Februari",
    total_price: 300000,
    total_payment: 300000,
  },
  {
    id: "#101034725",
    date: "10 Jul 2023",
    name: "Oka Ramdani",
    payment: "SPP Maret",
    total_price: 320000,
    total_payment: 320000,
  },
  {
    id: "#101034726",
    date: "25 Jul 2023",
    name: "Putri Ayu",
    payment: "SPP April",
    total_price: 340000,
    total_payment: 340000,
  },
  {
    id: "#101034727",
    date: "10 Aug 2023",
    name: "Qori Hanafi",
    payment: "SPP Mei",
    total_price: 300000,
    total_payment: 300000,
  },
  {
    id: "#101034728",
    date: "25 Aug 2023",
    name: "Rina Oktaviani",
    payment: "SPP Juni",
    total_price: 330000,
    total_payment: 330000,
  },
  {
    id: "#101034729",
    date: "10 Sep 2023",
    name: "Siti Maemunah",
    payment: "SPP Juli",
    total_price: 310000,
    total_payment: 310000,
  },
  {
    id: "#101034730",
    date: "25 Sep 2023",
    name: "Tomi Rahmat",
    payment: "SPP Agustus",
    total_price: 350000,
    total_payment: 350000,
  },
  {
    id: "#101034731",
    date: "10 Oct 2023",
    name: "Umar Fahmi",
    payment: "SPP September",
    total_price: 300000,
    total_payment: 300000,
  },
  {
    id: "#101034732",
    date: "25 Oct 2023",
    name: "Vina Andriani",
    payment: "SPP Oktober",
    total_price: 320000,
    total_payment: 320000,
  },
  {
    id: "#101034733",
    date: "10 Nov 2023",
    name: "Wulan Sari",
    payment: "SPP November",
    total_price: 340000,
    total_payment: 340000,
  },
  {
    id: "#101034734",
    date: "25 Nov 2023",
    name: "Yanto Kusuma",
    payment: "SPP Desember",
    total_price: 330000,
    total_payment: 330000,
  },
  {
    id: "#101034735",
    date: "10 Dec 2023",
    name: "Zahra Maulida",
    payment: "SPP Januari",
    total_price: 310000,
    total_payment: 310000,
  },
];
