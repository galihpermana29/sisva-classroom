"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { HARI_FIELD_NAME } from "../../filters/HariSelect";

function FilterDaySelect({ formik, name, label, placeholder, disabled, data }) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(HARI_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(HARI_FIELD_NAME, value);

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
        value={defaultValue}
        onChange={(event) => {
          formik.setFieldValue(name, event.target.value);
          handleChange(event.target.value);
        }}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
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

export default FilterDaySelect;
