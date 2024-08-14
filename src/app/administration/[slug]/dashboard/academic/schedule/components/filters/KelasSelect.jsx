"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { useMounted } from "@mantine/hooks";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FilterNotMounted } from "./FilterNotMounted";

export const KELAS_FIELD_NAME = "kelas";

export const KelasSelect = ({ data, disabled }) => {
  const searchParams = useSearchParams();
  const value = Boolean(searchParams.get(KELAS_FIELD_NAME) && data)
    ? parseInt(searchParams.get(KELAS_FIELD_NAME))
    : "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(KELAS_FIELD_NAME, value);

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
      <MenuItem
        disabled
        value=""
      >
        Kelas
      </MenuItem>
      {data
        ? data.map(({ class_id, class_name }) => (
            <MenuItem
              key={`${class_id}${class_name}`}
              value={class_id}
            >
              {class_name}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
