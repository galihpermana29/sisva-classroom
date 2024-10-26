'use client';

import { MenuItem, Stack, TextField, Typography } from '@mui/material';

import { formAddExtracurriculer } from '@/globalcomponents/FormFields';

export const FormAddExtracurriculer = ({ formik, editing, teacherList }) => {
  return (
    <>
      {formAddExtracurriculer.map((field) =>
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
        ) : field.type === 'select' ? (
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
              {teacherList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography fontSize={14}>{option.name}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : null
      )}
    </>
  );
};
