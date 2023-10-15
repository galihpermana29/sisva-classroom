"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { formStudentBasicFields } from "@/globalcomponents/FormFields";
import { Cancel } from "@mui/icons-material";
import { useState } from "react";
import { permissions, types } from "@/globalcomponents/Variable";

export const FormStudentBasic = ({ formik, editing }) => {
  if (!editing) {
    return (
      <>
        {formStudentBasicFields.map((field) =>
          field.type === "text" ? (
            <Grid
              sx={{ marginBottom: "8px" }}
              item
              xs={12}
              md={field.md}
              key={field.name}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="body2" fontWeight={500} fontSize={14}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body2" fontWeight={400} fontSize={14}>
                  {formik.values[field.name] ? formik.values[field.name] : ""}
                </Typography>
              </Grid>
            </Grid>
          ) : null
        )}
      </>
    );
  } else
    return (
      <>
        {formStudentBasicFields.map((field) =>
          field.type === "text" ? (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={1}>
                {field.label}
              </Typography>
              <TextField
                name={field.name}
                placeholder={field.placeholder}
                fullWidth
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
              />
            </Grid>
          ) : null
        )}
      </>
    );
};
