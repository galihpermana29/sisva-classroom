"use client";

import { Stack, TextField, Typography } from "@mui/material";

export const FormAddCurriculum = ({ formik }) => {
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
          value={formik.values["name"]}
          onChange={(e) => formik.setFieldValue("name", e.target.value)}
        />
      </Stack>
    </>
  );
};
