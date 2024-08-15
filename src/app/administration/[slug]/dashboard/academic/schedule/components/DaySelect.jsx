"use client";

import { Alert, MenuItem, Select, Stack, Typography } from "@mui/material";

export const DaySelect = ({
  formik,
  name,
  label,
  placeholder,
  disabled,
  withError = true,
}) => {
  return (
    <Stack spacing={1}>
      <Typography
        fontWeight={600}
        variant="body2"
      >
        {label}
      </Typography>
      <Select
        disabled={disabled}
        id={name}
        name={name}
        value={formik.values ? formik.values[name] : ""}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        displayEmpty
      >
        <MenuItem
          disabled
          value={""}
        >
          {placeholder}
        </MenuItem>
        {days.map(({ label, value }) => (
          <MenuItem
            key={`${label}${value}`}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
      {withError && formik.touched[name] && Boolean(formik.errors[name]) ? (
        <Alert severity="error">{formik.errors[name]}</Alert>
      ) : null}
    </Stack>
  );
};

const days = [
  { label: "Senin", value: 1 },
  { label: "Selasa", value: 2 },
  { label: "Rabu", value: 3 },
  { label: "Kamis", value: 4 },
  { label: "Jum'at", value: 5 },
  { label: "Sabtu", value: 6 },
  { label: "Minggu", value: 7 },
];
