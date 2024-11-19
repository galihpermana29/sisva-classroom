"use client";

// ! this component is not used
import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { GURU_FIELD_NAME } from "../../filters/GuruSelect";

function FilterTeacherSelect({ name, label, placeholder, data }) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(GURU_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(GURU_FIELD_NAME, value);

  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <Select
        id={name}
        name={name}
        size="small"
        value={defaultValue}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        displayEmpty
      >
        <MenuItem disabled value={""}>
          {placeholder}
        </MenuItem>
        {data &&
          data.map(({ label, value }) => (
            <MenuItem key={`${label}${value}`} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </Stack>
  );
}

export default FilterTeacherSelect;
