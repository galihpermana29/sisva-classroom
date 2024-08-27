"use client";

import { useSearchParams } from "next/navigation";
import { TANGGAL_FIELD_NAME } from "../components/filters/DateRangeSelect";
import { KATEGORI_FIELD_NAME } from "../components/filters/KategoriSelect";
import { STATUS_FIELD_NAME } from "../components/filters/StatusSelect";
import { SEARCH_FIELD_NAME } from "../components/filters/SearchInput";

/** Get current filter value based on URL search params
 * @returns {{tanggal: string | null, kategori: string | null, status: string | null, cari: string | null}}
 */
export const useFilterStatus = () => {
  const searchParams = useSearchParams();
  const tanggal = searchParams.get(TANGGAL_FIELD_NAME);
  const kategori = searchParams.get(KATEGORI_FIELD_NAME);
  const status = searchParams.get(STATUS_FIELD_NAME);
  const cari = searchParams.get(SEARCH_FIELD_NAME);

  return { tanggal, kategori, status, cari };
};
