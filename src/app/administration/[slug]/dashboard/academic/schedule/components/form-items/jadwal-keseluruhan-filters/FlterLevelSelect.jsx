"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { TINGKAT_FIELD_NAME } from "../../filters/TingkatSelect";

function FilterLevelSelect({ formik, name, label, placeholder, data }) {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(TINGKAT_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(TINGKAT_FIELD_NAME, value);

  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <Select
        id={name}
        name={name}
        size="small"
        defaultValue={defaultValue}
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

export default FilterLevelSelect;
