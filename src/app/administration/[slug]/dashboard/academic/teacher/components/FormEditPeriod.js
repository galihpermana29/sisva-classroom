'use client';

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import {
  formAddPeriodFields,
  formAddStudyProgramFields,
  formEditPeriodFields,
} from '@/globalcomponents/FormFields';
import { Cancel, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { permissions } from '@/globalcomponents/Variable';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const FormEditPeriod = ({ formik, editing, status }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const renderInput = (props) => (
    <Input
      type='text'
      inputProps={{
        sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
        startAdornment: props.value && (
          <Cancel
            onClick={() => {
              setStudyProgramFilter('');
            }}
            sx={{
              fontSize: 14,
              color: 'base.base50',
              cursor: 'pointer',
              transform: 'translateX(-4px)',
              '&:hover': {
                color: 'base.base60',
              },
            }}
          />
        ),
      }}
    />
  );
  if (status === 'Tidak Aktif') {
    return (
      <>
        {formEditPeriodFields.map((field) =>
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
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
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
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
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
          ) : field.type === 'month-range' ? (
            <Stack flexDirection={'row'} key={field.name}>
              <Stack sx={{ flex: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack sx={{ mb: 1 }}>
                    <Typography variant='body2' fontWeight={600} mb={0.5}>
                      Waktu Mulai
                    </Typography>
                    <DatePicker
                      placeholder={'Waktu Mulai'}
                      views={['month', 'year']}
                      renderInput={renderInput}
                      value={formik.values['start_time']}
                      onChange={(value) => {
                        formik.setFieldValue('start_time', value);
                      }}
                    />
                  </Stack>

                  <Stack>
                    <Typography variant='body2' fontWeight={600} mb={0.5}>
                      Waktu Selesai
                    </Typography>

                    <DatePicker
                      placeholder={'Waktu Selesai'}
                      views={['month', 'year']}
                      renderInput={renderInput}
                      value={formik.values['end_time']}
                      onChange={(value) =>
                        formik.setFieldValue('end_time', value)
                      }
                    />
                  </Stack>
                </LocalizationProvider>
              </Stack>
            </Stack>
          ) : null
        )}
      </>
    );
  }
  if (status === 'Aktif') {
    return (
      <>
        <Typography sx={{ mt: 1, fontSize: 14 }}>
          Periode berikut sedang aktif:
        </Typography>
        <Stack
          sx={{
            backgroundColor: 'base.base20',
            p: 1,
            borderRadius: 2,
            flexDirection: 'row',
            alignItems: 'center',
            mt: 1,
            mb: 2,
          }}
        >
          {/* <Avatar
            sx={{
              width: "40px",
              height: "40px",
              position: "relative",
              mr: 1,
            }}
          >
            <Image
              alt="Web Image"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              src={activeRow.profile_image_uri}
            />
          </Avatar> */}
          <Stack alignItems={'center'} direction={'row'}>
            <Box
              sx={{
                height: 8,
                width: 8,
                borderRadius: 10,
                mr: 0.5,
                backgroundColor: 'green',
              }}
            />
            <Typography
              sx={{
                color: 'black',
                fontWeight: 600,
              }}
            >
              {formik.values['period_name']}
            </Typography>
            {/* <Typography sx={{ fontSize: 14, lineHeight: "16px" }}>
              {formik.values["study_program"]}
            </Typography> */}
          </Stack>
        </Stack>
      </>
    );
  }
};
