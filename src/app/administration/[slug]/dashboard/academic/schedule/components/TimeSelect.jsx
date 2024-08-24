import { dayjsToTimeString, timeStringToDayjs } from "@/utils/formatTimeString";
import { Alert, Stack, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

export const TimeSelect = ({
  formik,
  name,
  label,
  disabled,
  withError = true,
}) => {
  return (
    <Stack width="100%" spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <TimePicker
        disabled={disabled}
        id={name}
        name={name}
        value={
          formik.values && formik.values[name]
            ? timeStringToDayjs(formik.values[name])
            : null
        }
        onChange={(value) =>
          formik.setFieldValue(name, dayjsToTimeString(value))
        }
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
      />
      {withError && formik.touched[name] && Boolean(formik.errors[name]) ? (
        <Alert severity="error">{formik.errors[name]}</Alert>
      ) : null}
    </Stack>
  );
};
