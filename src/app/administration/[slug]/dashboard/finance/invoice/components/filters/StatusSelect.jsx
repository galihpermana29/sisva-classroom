"use client";

import { FilterNotMounted } from "@/components/FilterNotMounted";
import { useMounted } from "@mantine/hooks";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useInvoiceFilters } from "../../hooks/useInvoiceFilters";

/** Use this field name to get or modify status filter value elsewhere */
export const STATUS_FIELD_NAME = "status";

export const StatusSelect = ({ data, disabled }) => {
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const { updateFilters } = useInvoiceFilters();

  const value = Boolean(searchParams.get(STATUS_FIELD_NAME) && data)
    ? searchParams.get(STATUS_FIELD_NAME)
    : "";

  const handleChange = (event) =>
    updateFilters(STATUS_FIELD_NAME, event.target.value);

  if (!mounted) return <FilterNotMounted />;

  return (
    <Select
      onChange={handleChange}
      disabled={disabled}
      value={value}
      size="small"
      displayEmpty
    >
      <MenuItem
        disabled
        value=""
      >
        Status
      </MenuItem>
      {data
        ? data.map(({ value, label }) => (
            <MenuItem
              key={`${value}${label}`}
              value={value}
            >
              {label}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
