"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilterStatus } from "./useFilterStatus";
import { usePagination } from "./usePagination";
import { paginateData } from "@/utils/paginateData";

export const useGetInvoice = () => {
  const filters = useFilterStatus();
  const { rowsPerPage } = usePagination();

  const { data: queryData, ...query } = useQuery({
    queryKey: ["invoice", { ...filters }],
    queryFn: () => mock,
  });

  const results = filterData(queryData, { ...filters });
  const paginatedData = paginateData(results, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};

const filterData = (queryData, { ...filters }) => {
  if (!queryData || queryData.length === 0) {
    return [];
  }

  return queryData.filter((data) =>
    filters.cari
      ? data.name.toLowerCase().includes(filters.cari.toLowerCase())
      : true
  );
};

const mock = [
  {
    id: "#101034711",
    name: "Bimo Arsa",
    description: "SPP Januari",
    total_price: 300000,
    invoice_value: 300000,
    status: "lunas",
  },
  {
    id: "#101034712",
    name: "Dewi Lestari",
    description: "SPP Februari",
    total_price: 350000,
    invoice_value: 350000,
    status: "verifikasi",
  },
  {
    id: "#101034713",
    name: "Arif Pratama",
    description: "SPP Maret",
    total_price: 320000,
    invoice_value: 300000,
    status: "pending",
  },
  {
    id: "#101034714",
    name: "Citra Dewi",
    description: "SPP April",
    total_price: 340000,
    invoice_value: 340000,
    status: "lunas",
  },
  {
    id: "#101034715",
    name: "Eko Susilo",
    description: "SPP Mei",
    total_price: 300000,
    invoice_value: 280000,
    status: "pending",
  },
  {
    id: "#101034716",
    name: "Fahmi Setiawan",
    description: "SPP Juni",
    total_price: 330000,
    invoice_value: 330000,
    status: "verifikasi",
  },
  {
    id: "#101034717",
    name: "Gita Putri",
    description: "SPP Juli",
    total_price: 310000,
    invoice_value: 310000,
    status: "lunas",
  },
  {
    id: "#101034718",
    name: "Hana Wijaya",
    description: "SPP Agustus",
    total_price: 350000,
    invoice_value: 350000,
    status: "verifikasi",
  },
  {
    id: "#101034719",
    name: "Iwan Setyawan",
    description: "SPP September",
    total_price: 300000,
    invoice_value: 280000,
    status: "pending",
  },
  {
    id: "#101034720",
    name: "Joko Santoso",
    description: "SPP Oktober",
    total_price: 320000,
    invoice_value: 320000,
    status: "lunas",
  },
  {
    id: "#101034721",
    name: "Kartika Sari",
    description: "SPP November",
    total_price: 340000,
    invoice_value: 340000,
    status: "verifikasi",
  },
  {
    id: "#101034722",
    name: "Lia Anggraeni",
    description: "SPP Desember",
    total_price: 330000,
    invoice_value: 330000,
    status: "lunas",
  },
  {
    id: "#101034723",
    name: "Mia Farida",
    description: "SPP Januari",
    total_price: 310000,
    invoice_value: 310000,
    status: "lunas",
  },
  {
    id: "#101034724",
    name: "Nina Sari",
    description: "SPP Februari",
    total_price: 300000,
    invoice_value: 290000,
    status: "pending",
  },
  {
    id: "#101034725",
    name: "Oka Ramdani",
    description: "SPP Maret",
    total_price: 320000,
    invoice_value: 300000,
    status: "verifikasi",
  },
  {
    id: "#101034726",
    name: "Putri Ayu",
    description: "SPP April",
    total_price: 340000,
    invoice_value: 340000,
    status: "lunas",
  },
  {
    id: "#101034727",
    name: "Qori Hanafi",
    description: "SPP Mei",
    total_price: 300000,
    invoice_value: 280000,
    status: "pending",
  },
  {
    id: "#101034728",
    name: "Rina Oktaviani",
    description: "SPP Juni",
    total_price: 330000,
    invoice_value: 330000,
    status: "verifikasi",
  },
  {
    id: "#101034729",
    name: "Siti Maemunah",
    description: "SPP Juli",
    total_price: 310000,
    invoice_value: 310000,
    status: "lunas",
  },
  {
    id: "#101034730",
    name: "Tomi Rahmat",
    description: "SPP Agustus",
    total_price: 350000,
    invoice_value: 340000,
    status: "verifikasi",
  },
  {
    id: "#101034731",
    name: "Umar Fahmi",
    description: "SPP September",
    total_price: 300000,
    invoice_value: 300000,
    status: "lunas",
  },
  {
    id: "#101034732",
    name: "Vina Andriani",
    description: "SPP Oktober",
    total_price: 320000,
    invoice_value: 310000,
    status: "pending",
  },
  {
    id: "#101034733",
    name: "Wulan Sari",
    description: "SPP November",
    total_price: 340000,
    invoice_value: 340000,
    status: "verifikasi",
  },
  {
    id: "#101034734",
    name: "Yanto Kusuma",
    description: "SPP Desember",
    total_price: 330000,
    invoice_value: 320000,
    status: "pending",
  },
  {
    id: "#101034735",
    name: "Zahra Maulida",
    description: "SPP Januari",
    total_price: 310000,
    invoice_value: 310000,
    status: "lunas",
  },
  {
    id: "#101034736",
    name: "Ayu Lestari",
    description: "SPP Februari",
    total_price: 300000,
    invoice_value: 280000,
    status: "verifikasi",
  },
  {
    id: "#101034737",
    name: "Budi Hartono",
    description: "SPP Maret",
    total_price: 320000,
    invoice_value: 300000,
    status: "lunas",
  },
  {
    id: "#101034738",
    name: "Cindy Maulana",
    description: "SPP April",
    total_price: 340000,
    invoice_value: 330000,
    status: "pending",
  },
  {
    id: "#101034739",
    name: "Dani Setiawan",
    description: "SPP Mei",
    total_price: 300000,
    invoice_value: 300000,
    status: "verifikasi",
  },
  {
    id: "#101034740",
    name: "Erika Pratiwi",
    description: "SPP Juni",
    total_price: 330000,
    invoice_value: 330000,
    status: "lunas",
  },
];
