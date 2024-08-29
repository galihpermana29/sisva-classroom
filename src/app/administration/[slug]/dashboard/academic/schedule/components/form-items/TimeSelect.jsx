import { dayjsToTimeString, timeStringToDayjs } from "@/utils/formatTimeString";
import { Alert, Stack, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

export const TimeSelect = ({ formik, name, label, disabled }) => {
  return (
    <Stack width="100%" spacing={1}>
      <Typography fontWeight={600} variant="body2">
        {label}
      </Typography>
      <TimePicker
        disabled={disabled}
        id={name}
        name={name}
        slotProps={{
          textField: {
            size: "small",
            error: formik.touched[name] && Boolean(formik.errors[name]),
          },
        }}
        value={
          formik.values && formik.values[name]
            ? timeStringToDayjs(formik.values[name])
            : null
        }
        onChange={(value) =>
          formik.setFieldValue(name, dayjsToTimeString(value))
        }
        onBlur={formik.handleBlur}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Typography className="text-red-700" fontSize={"12px"}>
          {formik.errors[name]}
        </Typography>
      )}
    </Stack>
  );
};
