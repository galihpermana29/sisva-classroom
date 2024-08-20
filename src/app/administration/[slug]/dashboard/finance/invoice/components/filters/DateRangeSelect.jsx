"use client";

import { FilterNotMounted } from "@/components/FilterNotMounted";
import { useMounted } from "@mantine/hooks";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInvoiceFilters } from "../../hooks/useInvoiceFilters";

/** Use this field name to get or modify date range filter value elsewhere */
export const TANGGAL_FIELD_NAME = "tanggal";

export const DateRangeSelect = ({ disabled }) => {
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const { updateFilters } = useInvoiceFilters();

  /** @description date range format in url query is: tanggal={start_time}-{end-time} */
  const rangeArr = searchParams.get(TANGGAL_FIELD_NAME)?.split("-") ?? [];

  const value = {
    startDate: rangeArr[0] ?? null,
    endDate: rangeArr[1] ?? null,
  };

  const [dateRange, setDateRange] = useState(value);

  const handleStartDateChange = (date) =>
    setDateRange((prev) => ({ ...prev, startDate: date.format("DD/MM/YYYY") }));

  const handleEndDateChange = (date) =>
    setDateRange((prev) => ({
      ...prev,
      endDate: date.format("DD/MM/YYYY"),
    }));

  /** @description handles url query update, only if startDate and endDate are not null/undefined */
  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate)
      updateFilters(
        TANGGAL_FIELD_NAME,
        `${dateRange?.startDate}-${dateRange?.endDate}`
      );
  }, [dateRange]);

  /** @description handles state syncronization every query changes */
  useEffect(() => {
    setDateRange(value);
  }, [searchParams]);

  if (!mounted) return <FilterNotMounted />;

  return (
    <>
      <DatePicker
        label="Tanggal Awal"
        disabled={disabled}
        value={
          Boolean(dateRange?.startDate)
            ? dayjs(dateRange?.startDate, "DD/MM/YYYY")
            : null
        }
        slotProps={{ textField: { size: "small" } }}
        sx={{ maxWidth: "150px" }}
        onChange={handleStartDateChange}
      />
      <DatePicker
        label="Tanggal Akhir"
        disabled={disabled}
        value={
          Boolean(dateRange?.endDate)
            ? dayjs(dateRange?.endDate, "DD/MM/YYYY")
            : null
        }
        slotProps={{ textField: { size: "small" } }}
        sx={{ maxWidth: "150px" }}
        onChange={handleEndDateChange}
      />
    </>
  );
};
