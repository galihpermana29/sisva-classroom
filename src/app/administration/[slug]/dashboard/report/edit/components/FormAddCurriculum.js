"use client";

import {
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";

export const FormAddCurriculum = ({ formik, editing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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
