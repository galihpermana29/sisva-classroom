"use client";

import { MenuItem, Stack, TextField, Typography } from "@mui/material";

import { formAddPeriodFields } from "@/globalcomponents/FormFields";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const FormAddPeriod = ({ formik }) => {
  return (
    <>
      {formAddPeriodFields.map((field) =>
        field.type === "text" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
            />
          </Stack>
        ) : field.type === "select" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              select
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {field.data.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                  <Typography fontSize={14}>{option.title}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : field.type === "month-range" ? (
          <Stack flexDirection={"row"} key={field.name}>
            <Stack sx={{ flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} mb={0.5}>
                    Waktu Mulai
                  </Typography>
                  <DatePicker
                    views={["month", "year"]}
                    value={formik.values["start_time"]}
                    onChange={(value) =>
                      formik.setFieldValue("start_time", value)
                    }
                  />
                </Stack>

                <Stack>
                  <Typography variant="body2" fontWeight={600} mb={0.5}>
                    Waktu Selesai
                  </Typography>

                  <DatePicker
                    views={["month", "year"]}
                    value={formik.values["end_time"]}
                    onChange={(value) =>
                      formik.setFieldValue("end_time", value)
                    }
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
          </Stack>
        ) : null
      )}
    </>
  );
};
