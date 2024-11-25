"use client";

import { useMounted } from "@mantine/hooks";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { useQueryParam } from "@/hooks/useQueryParam";

import { FilterNotMounted } from "./FilterNotMounted";

export const TINGKAT_FIELD_NAME = "tingkat";

export const TingkatSelect = ({ data, disabled }) => {
  const searchParams = useSearchParams();
  const value = Boolean(searchParams.get(TINGKAT_FIELD_NAME) && data)
    ? searchParams.get(TINGKAT_FIELD_NAME)
    : "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(TINGKAT_FIELD_NAME, value);

  const mounted = useMounted();
  if (!mounted) return <FilterNotMounted />;

  return (
    <Select
      disabled={disabled}
      size="small"
      displayEmpty
      value={value}
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem disabled value="">
        Tingkatan
      </MenuItem>
      {data
        ? data.map((grade) => (
            <MenuItem key={`${grade}grades`} value={grade}>
              {grade}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
