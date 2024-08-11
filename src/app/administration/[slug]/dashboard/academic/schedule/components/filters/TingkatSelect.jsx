"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const TINGKAT_FIELD_NAME = "tingkat";

export const TingkatSelect = ({ data, disabled }) => {
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
      <MenuItem
        disabled
        value=""
      >
        Tingkatan
      </MenuItem>
      {data
        ? data.map((grade) => (
            <MenuItem
              key={`${grade}grades`}
              value={grade}
            >
              {grade}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
