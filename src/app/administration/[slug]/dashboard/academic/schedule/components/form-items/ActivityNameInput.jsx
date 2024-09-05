"use client";

import { Stack, TextField, Typography } from "@mui/material";

export const ActivityNameInput = ({
  formik,
  name,
  label,
  placeholder,
  disabled,
}) => {
  return (
    <Stack spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <TextField
        id={name}
        size="small"
        name={name}
        placeholder={placeholder}
        defaultValue={formik.initialValues[name]}
        disabled={disabled}
        value={formik.values ? formik.values[name] : ""}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        displayEmpty
      ></TextField>
      {formik.touched[name] && formik.errors[name] && (
        <Typography className="text-red-700" fontSize={"12px"}>
          {formik.errors[name]}
        </Typography>
      )}
    </Stack>
  );
};
