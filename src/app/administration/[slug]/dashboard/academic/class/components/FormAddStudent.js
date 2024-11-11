"use client";

import { MenuItem, Stack, TextField, Typography } from "@mui/material";

import { formInsertStudentGroup } from "@/globalcomponents/FormFields";
import { useEffect, useState } from "react";

export const FormAddStudent = ({ formik, editing, studentList, groupList }) => {
  const [students, setStudents] = useState([]);
  const [group, setGroup] = useState(groupList);

  const fetchStudent = (id) => {
    const grade = groupList.find((gl) => gl.id == id).grade;

    const selected = studentList.filter((st) => st.detail.grade == grade);

    setStudents(selected);
  };

  const fetchClass = (grade) => {
    groupList = groupList.filter((gl) => gl.grade == grade);

    setGroup(groupList);
  };

  useEffect(() => {
    if (editing) {
      setStudents([
        { id: formik.values.student, name: formik.values.student_name },
      ]);

      fetchClass(formik.values.grade);
    }
  }, [groupList]);

  return (
    <>
      {formInsertStudentGroup.map((field) =>
        field.name === "class" ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              select
              value={formik.values[field.name]}
              onChange={(e) => {
                formik.setFieldValue(field.name, e.target.value);
                editing ? null : fetchStudent(e.target.value);
              }}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {group.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography fontSize={14}>{option.name}</Typography>
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
              disabled={editing ? true : false}
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {students.length ? (
                students.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Typography fontSize={14}>{option.name}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <Typography fontSize={14}>Siswa Tidak Tersedia</Typography>
                </MenuItem>
              )}
            </TextField>
          </Stack>
        )
      )}
    </>
  );
};
