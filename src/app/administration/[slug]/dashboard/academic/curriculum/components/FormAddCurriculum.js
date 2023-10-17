"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { formAddStudyProgramFields } from "@/globalcomponents/FormFields";
import { Cancel, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { permissions } from "@/globalcomponents/Variable";

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
