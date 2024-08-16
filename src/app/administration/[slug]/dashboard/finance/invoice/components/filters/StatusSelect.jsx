"use client";

import { FilterNotMounted } from "@/components/FilterNotMounted";
import { useMounted } from "@mantine/hooks";
import { MenuItem, Select } from "@mui/material";

export const StatusSelect = ({ data, disabled }) => {
  const mounted = useMounted();
  if (!mounted) return <FilterNotMounted />;

  return (
    <Select
      defaultValue=""
      disabled={disabled}
      size="small"
      displayEmpty
    >
      <MenuItem
        disabled
        value=""
      >
        Status
      </MenuItem>
      {data
        ? data.map(({ value, label }) => (
            <MenuItem
              key={`${value}${label}`}
              value={value}
            >
              {value}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
