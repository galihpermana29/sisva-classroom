"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";

export const LevelSelect = ({ formik, name, label, placeholder, disabled }) => {
  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <Select
        id={name}
        name={name}
        disabled={disabled}
        value={formik.values ? formik.values[name] : ""}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        displayEmpty
      >
        <MenuItem disabled value={""}>
          {placeholder}
        </MenuItem>
        {data.map(({ label, value }) => (
          <MenuItem key={`${label}${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

const data = [{ value: "XI", label: "XI" }];
