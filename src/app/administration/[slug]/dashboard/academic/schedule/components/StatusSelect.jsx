import { Alert, MenuItem, Select, Stack, Typography } from "@mui/material";

export const StatusSelect = ({
  formik,
  name,
  label,
  placeholder,
  disabled,
  withError = true,
}) => {
  return (
    <Stack width="100%" spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <Select
        disabled={disabled}
        id={name}
        name={name}
        value={formik.values && formik.values[name] ? formik.values[name] : ""}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        displayEmpty
      >
        <MenuItem disabled value={""}>
          {placeholder}
        </MenuItem>
        {statuses.map(({ label, value }) => (
          <MenuItem key={`${label}${value}`} value={value}>
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

const statuses = [
  { label: "Tidak aktif", value: "inactive" },
  { label: "Aktif", value: "active" },
  { label: "Selesai", value: "finished" },
];
