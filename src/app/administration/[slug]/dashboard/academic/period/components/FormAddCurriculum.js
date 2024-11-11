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

import { formAddCurriculumFields } from "@/globalcomponents/FormFields";
import { permissions } from "@/globalcomponents/Variable";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";

export const FormAddCurriculum = ({
  formik,
  editing,
  optPeriod,
  dataAllCurr,
  dataStudyProgram,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [studyProgramData, setStudyProgramData] = useState();
  const [gradeData, setGradeData] = useState();
  const [currId, setCurrId] = useState();

  const updatedSubjectFields = formAddCurriculumFields.map((field) => {
    if (field.name == "period_name") {
      field.data = optPeriod?.map((td) => {
        return { slug: td.id, title: td.name };
      });
    }

    if (field.name == "curriculum_name") {
      field.data = dataAllCurr?.map((sp) => {
        return { slug: sp.id, title: sp.name };
      });
    }

    return field;
  });

  const fetchStudy = async (val) => {
    setCurrId(val);

    const findCurr = dataAllCurr.find((dac) => dac.id == val)?.study_programs;

    const mappedData = [...new Set(findCurr?.map((opt) => opt.id))]?.map(
      (fc) => {
        let title, grades;

        dataStudyProgram.forEach((dsp) => {
          if (fc == dsp.id) {
            title = dsp.name;
            grades = dsp.grades;
          }
        });
        return { slug: fc, title, grades };
      }
    );

    setStudyProgramData(mappedData);
  };

  const fetchGrade = async (val, curr) => {
    const findCurr = dataAllCurr.find(
      (dac) => dac.id == (currId ? currId : curr)
    )?.study_programs;

    const mappedData = [...new Set(findCurr?.map((opt) => opt.id))]?.map(
      (fc) => {
        let title, grades;

        dataStudyProgram.forEach((dsp) => {
          if (fc == dsp.id) {
            title = dsp.name;
            grades = dsp.grades;
          }
        });
        return { slug: fc, title, grades };
      }
    );

    const findGrade = mappedData?.find((spd) => spd.slug == val)?.grades;

    setGradeData(findGrade);
  };

  useEffect(() => {
    if (editing) {
      fetchStudy(formik.values.curriculum_name);
      fetchGrade(formik.values.study_program, formik.values.curriculum_name);
    }
  }, []);

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
          field.name === "period_name" ? (
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
          ) : field.name === "curriculum_name" ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  fetchStudy(e.target.value);
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
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  fetchGrade(e.target.value);
                }}
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
                {gradeData?.length
                  ? gradeData?.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography fontSize={14}>{option}</Typography>
                      </MenuItem>
                    ))
                  : ["Tingkatan Tidak Tersedia"].map((option, idx) => (
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
