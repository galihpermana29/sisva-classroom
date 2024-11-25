"use client";

import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { formAddStudentInExtracurriculer } from "@/globalcomponents/FormFields";

export const FormAddMembers = ({
  formik,
  studentList,
  extraList,
  dataMemExtra,
}) => {
  const [studentData, setStudentData] = useState([]);

  const mappedForm = formAddStudentInExtracurriculer.map((fs) => {
    if (fs.name == "title") fs.data = extraList;

    if (fs.name == "student") fs.data = studentList;

    return fs;
  });

  const fetchStudent = (extraId) => {
    const exist = dataMemExtra.filter((de) => de.extracurricular_id == extraId);

    const mappedData = studentList.filter(
      (sl) => !exist.find((ex) => ex.student_id == sl.id)
    );

    setStudentData(mappedData);
  };

  return (
    <>
      {mappedForm.map((field) =>
        field.name === "title" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              select
              value={formik.values[field.name]}
              onChange={(e) => {
                formik.setFieldValue(field.name, e.target.value);
                fetchStudent(e.target.value);
              }}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {field.data.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography fontSize={14}>{option.name}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : field.name === "student" ? (
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
              {formik.values.title ? (
                studentData.length ? (
                  studentData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Typography fontSize={14}>{option.name}</Typography>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled selected>
                    <Typography fontSize={14}>
                      Semua Murid Telah Menjadi Anggota
                    </Typography>
                  </MenuItem>
                )
              ) : (
                <MenuItem disabled>
                  <Typography fontSize={14}>
                    Pilih Ekstrakulikuler Terlebih Dahulu
                  </Typography>
                </MenuItem>
              )}
            </TextField>
          </Stack>
        ) : null
      )}
    </>
  );
};
