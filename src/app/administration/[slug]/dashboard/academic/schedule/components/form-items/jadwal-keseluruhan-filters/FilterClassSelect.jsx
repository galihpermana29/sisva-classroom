"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { KELAS_FIELD_NAME } from "../../filters/KelasSelect";
import { useSearchParams } from "next/navigation";
import { useQueryParam } from "@/hooks/useQueryParam";

function FilterClassSelect({
  formik,
  name,
  label,
  placeholder,
  disabled,
  data,
}) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(KELAS_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(KELAS_FIELD_NAME, value);

  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <Select
        id={name}
        name={name}
        disabled={disabled}
        size="small"
        defaultValue={defaultValue}
        onChange={(event) => {
          formik.setFieldValue(name, event.target.value);
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

export default FilterClassSelect;
