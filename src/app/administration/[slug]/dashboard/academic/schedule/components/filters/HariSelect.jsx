"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const HARI_FIELD_NAME = "hari";

export const HariSelect = ({ disabled }) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(HARI_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(HARI_FIELD_NAME, value);

  return (
    <Select
      disabled={disabled}
      size="small"
      displayEmpty
      value={value}
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem disabled value="">
        Hari
      </MenuItem>
      {data.map(({ value, label }) => (
        <MenuItem key={`${value}${label}`} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

const data = [
  { value: 1, label: "Senin" },
  { value: 2, label: "Selasa" },
  { value: 3, label: "Rabu" },
  { value: 4, label: "Kamis" },
  { value: 5, label: "Jumat" },
  { value: 6, label: "Sabtu" },
  { value: 7, label: "Minggu" },
];
