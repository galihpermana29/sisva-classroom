"use client";

import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { formAddSubjectFields } from "@/globalcomponents/FormFields";
import { permissions } from "@/globalcomponents/Variable";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export const FormAddSubject = ({
  formik,
  editing,
  tableData,
  studyProgram,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const updatedSubjectFields = formAddSubjectFields.map((field) => {
    if (field.name == "curriculum_name") {
      field.data = tableData.map((td) => {
        return { slug: td.id, title: td.name };
      });
    }

    return field;
  });

  const studyProgramData = studyProgram.map((dt) => {
    return { slug: dt.id, title: dt.name, code: dt.code };
  });

  return (
    <>
      {updatedSubjectFields.map((field) =>
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
          field.name === "curriculum_name" ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          ) : field.name === "study_program" ? (
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
                {studyProgramData?.length
                  ? studyProgramData?.map((option) => (
                      <MenuItem key={option.slug} value={option.slug}>
                        <Typography fontSize={14}>{option.title}</Typography>
                      </MenuItem>
                    ))
                  : ["Program Studi Tidak Tersedia"].map((option, idx) => (
                      <MenuItem
                        selected={idx == 0}
                        disabled
                        key={idx}
                        value={option}
                      >
                        <Typography fontSize={14}>{option}</Typography>
                      </MenuItem>
                    ))}
              </TextField>
            </Stack>
          ) : (
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
          )
        ) : field.type === "multiple-select" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600}>
              {field.label}
            </Typography>

            <FormControl sx={{ width: "100%" }}>
              {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
              <Select
                multiple
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                input={<OutlinedInput sx={{ p: 0 }} />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((permission) => {
                      let tempPermission;
                      permissions.map((item) => {
                        if (item.slug === permission) {
                          tempPermission = item.title;
                        }
                      });
                      return (
                        <Chip
                          key={permission}
                          label={tempPermission}
                          color="primary"
                        />
                      );
                    })}
                  </Box>
                )}
                MenuProps={{
                  anchorOrigin: { vertical: "top", horizontal: "center" },
                  transformOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                }}
              >
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ) : null
      )}
    </>
  );
};
