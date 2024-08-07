"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const KELAS_FIELD_NAME = "kelas";

export const KelasSelect = ({ disabled }) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(KELAS_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(KELAS_FIELD_NAME, value);

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

const data = [{ value: 1, label: "XI IPA 1" }];
