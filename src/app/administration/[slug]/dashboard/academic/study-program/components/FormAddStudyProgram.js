'use client';

import {
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { formAddStudyProgramFields } from '@/globalcomponents/FormFields';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export const FormAddStudyProgram = ({ formik, editing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <>
      {formAddStudyProgramFields.map((field) =>
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
        ) : field.type === 'password' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        field.name === 'password'
                          ? setShowPassword(!showPassword)
                          : setShowPasswordConfirm(!showPasswordConfirm)
                      }
                    >
                      {field.name === 'password' &&
                        (showPassword ? (
                          <VisibilityOff sx={{ fontSize: 16 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 16 }} />
                        ))}
                      {field.name === 'password_confirm' &&
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
              {field.data.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                  <Typography fontSize={14}>{option.title}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : null
      )}
    </>
  );
};
