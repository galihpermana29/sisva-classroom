"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";

export const DaySelect = ({ formik, name, label, placeholder }) => {
  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <Select
        id={name}
        name={name}
        value={formik.values ? formik.values[name] : ""}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        displayEmpty
      >
        <MenuItem disabled value={""}>
          {placeholder}
        </MenuItem>
        {days.map(({ label, value }) => (
          <MenuItem key={`${label}${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

const days = [
  { label: "Senin", value: 0 },
  { label: "Selasa", value: 1 },
  { label: "Rabu", value: 2 },
  { label: "Kamis", value: 3 },
  { label: "Jum'at", value: 4 },
  { label: "Sabtu", value: 5 },
];
