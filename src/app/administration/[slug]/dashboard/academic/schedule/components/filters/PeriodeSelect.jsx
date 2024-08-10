"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const PERIODE_FIELD_NAME = "periode";

export const PeriodeSelect = ({ disabled, data }) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(PERIODE_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(PERIODE_FIELD_NAME, value);

  return (
    <Select
      disabled={disabled}
      size="small"
      displayEmpty
      value={value}
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem disabled value="">
        Periode
      </MenuItem>
      {data.map(({ value, label }) => (
        <MenuItem key={`${value}${label}`} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
