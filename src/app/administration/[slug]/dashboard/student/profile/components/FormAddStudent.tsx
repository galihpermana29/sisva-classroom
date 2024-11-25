"use client";

import { useDebouncedCallback } from "@mantine/hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { formAddStudentFields } from "@/globalcomponents/FormFields";

export const FormAddStudent = ({ formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const setFieldValue = useDebouncedCallback(
    (fieldName, value) => formik.setFieldValue(fieldName, value),
    100
  );

  return (
    <>
      {formAddStudentFields.map((field) =>
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
        ) : field.type === "password" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              type={
                field.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : showPasswordConfirm
                    ? "text"
                    : "password"
              }
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              defaultValue={formik.values[field.name]}
              onChange={(e) => setFieldValue(field.name, e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        field.name === "password"
                          ? setShowPassword(!showPassword)
                          : setShowPasswordConfirm(!showPasswordConfirm)
                      }
                    >
                      {field.name === "password" &&
                        (showPassword ? (
                          <VisibilityOff sx={{ fontSize: 16 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 16 }} />
                        ))}
                      {field.name === "password_confirm" &&
                        (showPasswordConfirm ? (
                          <VisibilityOff sx={{ fontSize: 16 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 16 }} />
                        ))}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        ) : null
      )}
    </>
  );
};
