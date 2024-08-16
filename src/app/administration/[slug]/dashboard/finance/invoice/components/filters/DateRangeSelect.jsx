"use client";

import { FilterNotMounted } from "@/components/FilterNotMounted";
import { useMounted } from "@mantine/hooks";
import { MenuItem, Select } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";

export const DateRangeSelect = ({ data, disabled }) => {
  const mounted = useMounted();
  if (!mounted) return <FilterNotMounted />;

  return (
    <Select
      defaultValue=""
      disabled={disabled}
      size="small"
      displayEmpty
      endAdornment={<CalendarIcon />}
      IconComponent={() => null}
    >
      <MenuItem
        disabled
        value=""
      >
        Tanggal
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
