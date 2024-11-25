"use client";

import { useDebouncedCallback } from "@mantine/hooks";
import { Stack, TextField, Typography } from "@mui/material";

export const FormAddCurriculum = ({ formik }) => {
  const setFieldValue = useDebouncedCallback((fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  }, 50);

  return (
    <>
      <Stack sx={{ my: 1 }}>
        <Typography variant="body2" fontWeight={600} mb={0.5}>
          Kurikulum
        </Typography>
        <TextField
          name="curriculum"
          placeholder="Kurikulum"
          fullWidth
          defaultValue={formik.values["name"]}
          onChange={(e) => setFieldValue("name", e.target.value)}
        />
      </Stack>
    </>
  );
};
