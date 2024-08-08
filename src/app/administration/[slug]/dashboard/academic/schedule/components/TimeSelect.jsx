import { Stack, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const TimeSelect = ({ formik, name, label }) => {
  return (
    <Stack width="100%" spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <TimePicker
        id={name}
        name={name}
        size="small"
        value={formik.values ? formik.values[name] : dayjs()}
        onChange={(value) =>
          formik.setFieldValue(name, dayjs(value).format("HH:mm"))
        }
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
      />
    </Stack>
  );
};
