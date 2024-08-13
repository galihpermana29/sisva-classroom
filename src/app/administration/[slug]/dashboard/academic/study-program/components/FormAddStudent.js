'use client';

import { MenuItem, Stack, TextField, Typography } from '@mui/material';

import { formAddStudent } from '@/globalcomponents/FormFields';
import { useEffect, useState } from 'react';

export const FormAddStudent = ({ formik, editing, tableData, studentList }) => {
  console.log(formik);
  const [gradeData, setGradeData] = useState();

  const updatedSubjectFields = formAddStudent.map((field) => {
    if (field.name == 'student') {
      field.data = editing
        ? [
            {
              slug: formik.values.student,
              name: formik.values.student_name,
              json_text: formik.values.detail,
            },
          ]
        : studentList.map((td) => {
            return { slug: td.id, name: td.name, detail: td.detail };
          });
    }

    if (field.name == 'study_program') {
      field.data = tableData.map((td) => {
        return { slug: td.id, title: td.name };
      });
    }

    return field;
  });

  const fetchGrade = async (val) => {
    console.log(val);
    const grade = tableData.find((td) => td.id == val)?.grades;
    const name = tableData.find((td) => td.id == val)?.name;

    formik.setFieldValue('study_program_name', name);

    setGradeData(grade);
  };

  const fetchDetail = async (val) => {
    const detail = studentList.find((td) => td.id == val)?.detail;

    formik.setFieldValue('detail', detail);
  };

  useEffect(() => {
    fetchGrade(formik.values.study_program);
  }, [editing]);

  return (
    <>
      {updatedSubjectFields?.map((field) =>
        field.type === 'select' ? (
          field.name === 'student' ? (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant='body2' fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  fetchDetail(e.target.value);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {field.data.length
                  ? field.data.map((option) => (
                      <MenuItem key={option.slug} value={option.slug}>
                        <Typography fontSize={14}>{option.name}</Typography>
                      </MenuItem>
                    ))
                  : ['Siswa Tidak Tersedia'].map((option, idx) => (
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
          ) : field.name === 'study_program' ? (
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
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          ) : (
            <Stack sx={{ my: 1 }} key={field.name}>
              <Typography variant='body2' fontWeight={600} mb={0.5}>
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
                  : ['Tingkatan Tidak Tersedia'].map((option, idx) => (
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
        ) : null
      )}
    </>
  );
};
