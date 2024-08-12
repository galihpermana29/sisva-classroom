"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const PERIODE_FIELD_NAME = "periode";

export const PeriodeSelect = ({ data, disabled }) => {
  const searchParams = useSearchParams();
  const value = Boolean(searchParams.get(PERIODE_FIELD_NAME) && data)
    ? parseInt(searchParams.get(PERIODE_FIELD_NAME))
    : "";

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
      <MenuItem
        disabled
        value=""
      >
        Periode
      </MenuItem>
      {data
        ? data.map(({ id, name }) => (
            <MenuItem
              key={`${id}${name}`}
              value={id}
            >
              {name}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
