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

import {
  formAddStaffFields,
  formAddStudyProgramFields,
  formAddSubjectFields,
  formAddSyllabusFields,
} from "@/globalcomponents/FormFields";
import { Cancel, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { permissions } from "@/globalcomponents/Variable";

import PDFIcon from "@/assets/Icon-PDF.svg";

export const FormAddSyllabus = ({ formik, editing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  return (
    <>
      {formAddSyllabusFields.map((field) =>
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
        ) : field.type === "password" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
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
        ) : field.type === "file" ? (
          <Stack>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <Stack
              sx={{
                backgroundColor: "base.base20",
                p: 1.5,
                borderRadius: 2,
                mb: 0.5,
                flexDirection: "row",
                alignItems: "center",
                display: editing ? "flex" : "none",
              }}
            >
              <Image src={PDFIcon} height={18} />
              <Typography sx={{ fontSize: 13, ml: 1 }}>
                Silabus Matematika-Kurikulum Merdeka-IPA-X.pdf
              </Typography>
            </Stack>

            <label htmlFor="import-csv">
              <Button
                fullWidth
                variant="outlined"
                flexDirection={"row"}
                alignItems={"center"}
                sx={{mb:.5}}
              >
                {editing ? "Ubah" : "Upload"}
                <input
                  name={"import_csv"}
                  accept="csv"
                  id="import-csv"
                  type="file"
                  style={{
                    position: "absolute",
                    opacity: "0",
                    border: "1px solid red",
                  }}
                  // onChange={handleImageChange}
                />
              </Button>
            </label>
            <Button
              fullWidth
              variant="outlined"
              flexDirection={"row"}
              alignItems={"center"}
              sx={{ mb: 1, display: editing ? "flex" : "none" }}
            >
              Hapus
            </Button>
          </Stack>
        ) : null
      )}
    </>
  );
};
