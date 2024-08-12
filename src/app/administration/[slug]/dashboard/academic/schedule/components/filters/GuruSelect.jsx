"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const GURU_FIELD_NAME = "guru";

export const GuruSelect = ({ data, disabled }) => {
  const searchParams = useSearchParams();
  const value = Boolean(searchParams.get(GURU_FIELD_NAME) && data)
    ? searchParams.get(GURU_FIELD_NAME)
    : "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(GURU_FIELD_NAME, value);

  return (
    <Select
      disabled={disabled}
      size="small"
      displayEmpty
      value={value}
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem
        disabled
        value=""
      >
        Guru
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

const data = [{ value: 1, label: "Bimo Arsa S.Pd" }];
