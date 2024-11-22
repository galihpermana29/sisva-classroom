"use client";

import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";

import { formEditPeriodFields } from "@/globalcomponents/FormFields";

import { useDebouncedCallback } from "@mantine/hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const FormEditPeriod = ({ formik, status }) => {
  const setFieldValue = useDebouncedCallback((fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }, 200);

  if (status === "inactive") {
    return (
      <>
        {formEditPeriodFields.map((field) =>
          field.type === "text" ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                name={field.name}
                placeholder={field.placeholder}
                fullWidth
                defaultValue={formik.values[field.name]}
                onChange={(e) => setFieldValue(field.name, e.target.value)}
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
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
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
                      onChange={(value) => {
                        formik.setFieldValue("start_time", value);
                      }}
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
  }
  if (status === "active") {
    return (
      <>
        <Typography sx={{ mt: 1, fontSize: 14 }}>
          Periode berikut sedang aktif:
        </Typography>
        <Stack
          sx={{
            backgroundColor: "base.base20",
            p: 1,
            borderRadius: 2,
            flexDirection: "row",
            alignItems: "center",
            mt: 1,
            mb: 2,
          }}
        >
          <Stack alignItems={"center"} direction={"row"}>
            <Box
              sx={{
                height: 8,
                width: 8,
                borderRadius: 10,
                mr: 0.5,
                backgroundColor: "green",
              }}
            />
            <Typography
              sx={{
                color: "black",
                fontWeight: 600,
              }}
            >
              {formik.values["period_name"]}
            </Typography>
          </Stack>
        </Stack>
      </>
    );
  }
};
