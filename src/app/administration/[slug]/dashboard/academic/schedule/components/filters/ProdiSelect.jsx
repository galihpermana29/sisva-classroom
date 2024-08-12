"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const PRODI_FIELD_NAME = "prodi";

export const ProdiSelect = ({ data, disabled }) => {
  const searchParams = useSearchParams();
  const value = Boolean(searchParams.get(PRODI_FIELD_NAME) && data)
    ? parseInt(searchParams.get(PRODI_FIELD_NAME))
    : "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(PRODI_FIELD_NAME, value);

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
        Program Studi
      </MenuItem>
      {data
        ? data.map(({ id, code }) => (
            <MenuItem
              key={`${id}${code}`}
              value={id}
            >
              {code}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};

const data = [{ value: 1, label: "IPA" }];
