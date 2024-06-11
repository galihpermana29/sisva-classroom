'use client';

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { formStudentBiodataFields } from '@/globalcomponents/FormFields';
import { Cancel } from '@mui/icons-material';
import { useState } from 'react';
import {
  genders,
  nationalities,
  permissions,
  religions,
  types,
} from '@/globalcomponents/Variable';

export const FormStudentBiodata = ({
  formik,
  editing,
  handleImageChange = () => {},
}) => {
  function RenderGender({ value }) {
    let tempType;
    genders.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderNationality({ value }) {
    let tempType;
    nationalities.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderReligion({ value }) {
    let tempType;
    religions.map((item) => {
      if (item.slug === value) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  if (!editing) {
    return (
      <>
        {formStudentBiodataFields.map((field) =>
          field.type === 'text' ? (
            <Grid
              sx={{ marginBottom: '8px' }}
              item
              xs={12}
              md={field.md}
              key={field.name}
            >
              <Grid item xs={12} md={12}>
                <Typography variant='body2' fontWeight={500} fontSize={14}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant='body2' fontWeight={400} fontSize={14}>
                  {formik.values[field.name] ? formik.values[field.name] : ''}
                </Typography>
              </Grid>
            </Grid>
          ) : field.type === 'select' ? (
            <Grid
              sx={{ marginBottom: '8px' }}
              item
              xs={12}
              md={field.md}
              key={field.name}
            >
              <Grid item xs={12} md={12}>
                <Typography variant='body2' fontWeight={500} fontSize={14}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant='body2' fontWeight={400} fontSize={14}>
                  {field.name === 'gender' ? (
                    <RenderGender value={formik.values[field.name]} />
                  ) : field.name === 'nationality' ? (
                    <RenderNationality value={formik.values[field.name]} />
                  ) : field.name === 'religion' ? (
                    <RenderReligion value={formik.values[field.name]} />
                  ) : null}
                  {formik.values[field.name] ? '' : '-'}
                </Typography>
              </Grid>
            </Grid>
          ) : field.type === 'photo' ? (
            <Grid xs={12} item key={field.name}>
              <Typography variant='body2' fontWeight={500} fontSize={14}>
                {field.label}
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  width: 'fit-content',
                  backgroundColor: 'base.base20',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ height: 96, width: 96, position: 'relative' }}>
                  <Image
                    alt='Image'
                    src={`https://api-staging.sisva.id/file/v1/files/${
                      formik.values[field.name]
                    }?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
                    layout='fill'
                    objectFit='cover'
                  />
                </Box>
              </Box>
            </Grid>
          ) : null
        )}
      </>
    );
  } else
    return (
      <>
        {formStudentBiodataFields.map((field) =>
          field.type === 'text' ? (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant='body2' fontWeight={600} mb={1}>
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
            </Grid>
          ) : field.type === 'select' ? (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant='body2' fontWeight={600} mb={1}>
                {field.label}
              </Typography>

              <TextField
                select
                fullWidth
                value={formik.values[field.name]}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.value)
                }
                InputProps={{
                  startAdornment: formik.values[field.name] && (
                    <Cancel
                      onClick={() => {
                        setTypeFilter('');
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
              >
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : field.type === 'photo' ? (
            <Grid xs={12} item key={field.name}>
              <Typography variant='body2' fontWeight={500} fontSize={14}>
                {field.label}
              </Typography>
              <Stack
                sx={{
                  width: 112,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    width: 'fit-content',
                    backgroundColor: 'base.base20',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ height: 96, width: 96, position: 'relative' }}>
                    <Image
                      alt='Image'
                      src={`https://api-staging.sisva.id/file/v1/files/${
                        formik.values[field.name]
                      }?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
                      layout='fill'
                      objectFit='cover'
                    />
                  </Box>
                </Box>
                <label htmlFor='image-input'>
                  <Button
                    fullWidth
                    variant='outlined'
                    size='small'
                    sx={{ m: '8px 0 4px' }}
                  >
                    Ubah Foto
                    <input
                      name={'profile_image_uri'}
                      accept='image/*'
                      id='image-input'
                      type='file'
                      style={{
                        position: 'absolute',
                        opacity: '0',
                        border: '1px solid red',
                      }}
                      onChange={handleImageChange}
                    />
                  </Button>
                </label>
                <Button fullWidth variant='outlined' size='small'>
                  Hapus
                </Button>
              </Stack>
            </Grid>
          ) : null
        )}
      </>
    );
};
