'use client';

import { MenuItem, Stack, TextField, Typography } from '@mui/material';

import { formAddStudentGroup } from '@/globalcomponents/FormFields';
import { useEffect, useState } from 'react';

export const FormAddStudentGroup = ({
  formik,
  editing,
  teacherList,
  periodList,
  studyProgramList,
}) => {
  const [teacher, setTeacher] = useState(teacherList);
  const [studyProgram, setStudyProgram] = useState([]);
  const [grade, setGrade] = useState([]);

  const fetchProgramStudy = (id, grade, editing) => {
    const period = periodList.find((pl) => pl.id == id)?.study_programs;

    let selected = period.map((pd) =>
      studyProgramList.find((sp) => sp.id == pd.id)
    );

    if (editing) {
      selected = period.reduce((a, b) => {
        const found = studyProgramList.find(
          (sp) => sp.id == b.id && sp.grades.includes(grade)
        );

        if (found) {
          return [...a, found];
        }

        return a;
      }, []);
    }

    setStudyProgram(selected);
  };

  const fetchGrade = (id) => {
    let selected = studyProgramList.find((sp) => sp.id == id)?.grades;

    setGrade(selected);
  };

  useEffect(() => {
    if (editing) {
      setTeacher([
        ...teacher,
        {
          id: formik.values.homeroom_teacher_id,
          name: formik.values.homeroom_teacher,
        },
      ]);
      fetchProgramStudy(formik.values.period_id, formik.values.grade, editing);
      fetchGrade(formik.values.study_program_id);
    }
  }, []);

  return (
    <>
      {formAddStudentGroup.map((field) =>
        field.type === 'text' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
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
        ) : field.name === 'homeroom_teacher_id' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              select
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {teacher.length ? (
                teacher.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Typography fontSize={14}>{option.name}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <Typography fontSize={14}>Guru Tidak Tersedia</Typography>
                </MenuItem>
              )}
            </TextField>
          </Stack>
        ) : field.name === 'period_id' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              select
              disabled={editing ? true : false}
              value={formik.values[field.name]}
              onChange={(e) => {
                formik.setFieldValue(field.name, e.target.value);
                fetchProgramStudy(e.target.value);
              }}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {periodList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography fontSize={14}>{option.name}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : field.name === 'study_program_id' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
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
              {studyProgram.length ? (
                studyProgram.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Typography fontSize={14}>{option.name}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <Typography fontSize={14}>
                    Program Studi Tidak Tersedia
                  </Typography>
                </MenuItem>
              )}
            </TextField>
          </Stack>
        ) : field.name === 'grade' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              select
              disabled={editing ? true : false}
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
              sx={{ flex: { xs: 1, lg: 0 } }}
            >
              {grade.length ? (
                grade.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Typography fontSize={14}>{option}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <Typography fontSize={14}>
                    Tingkatan Tidak Tersedia
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
