"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { useMounted } from "@mantine/hooks";
import { MenuItem, Select } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FilterNotMounted } from "./FilterNotMounted";

export const GURU_FIELD_NAME = "guru";

export const GuruSelect = ({ data, disabled }) => {
  const searchParams = useSearchParams();
  const value = Boolean(searchParams.get(GURU_FIELD_NAME) && data)
    ? searchParams.get(GURU_FIELD_NAME)
    : "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(GURU_FIELD_NAME, value);

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
        Guru
      </MenuItem>
      {data
        ? data.map(({ teacher_id, teacher_name }) => (
            <MenuItem key={`${teacher_id}${teacher_name}`} value={teacher_id}>
              {teacher_name}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
