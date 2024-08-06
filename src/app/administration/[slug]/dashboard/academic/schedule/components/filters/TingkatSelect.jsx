"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const TINGKAT_FIELD_NAME = "tingkat";

export const TingkatSelect = ({ disabled }) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(TINGKAT_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(TINGKAT_FIELD_NAME, value);

  return (
    <Select
      disabled={disabled}
      size="small"
      displayEmpty
      value={value}
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem disabled value="">
        Kelas
      </MenuItem>
      {data.map(({ value, label }) => (
        <MenuItem key={`${value}${label}`} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

const data = [{ value: "XI", label: "XI" }];
