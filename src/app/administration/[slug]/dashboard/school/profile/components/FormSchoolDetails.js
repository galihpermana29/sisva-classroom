'use client';

import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';

import { formSchoolDetailsFields } from '@/globalcomponents/FormFields';

export const FormSchoolDetails = ({
  formik,
  editing,
  handleImageChange = () => {},
}) => {
  if (!editing) {
    return (
      <>
        {formSchoolDetailsFields.map((field) =>
          field.image ? (
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
                    src={formik.values[field.name]}
                    layout='fill'
                    objectFit='contain'
                  />
                </Box>
              </Box>
            </Grid>
          ) : (
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
          )
        )}
      </>
    );
  } else
    return (
      <>
        {formSchoolDetailsFields.map((field) =>
          field.image ? (
            <Grid xs={12} item key={field.name}>
              <Typography variant='body2' fontWeight={500} fontSize={14}>
                {field.label}
              </Typography>
              <Stack
                sx={{
                  mt: 1,
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
                      src={formik.values[field.name]}
                      layout='fill'
                      objectFit='contain'
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
                      name={'logo_uri'}
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
          ) : (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant='body2' fontWeight={600} sx={{ mb: '8px' }}>
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
          )
        )}
      </>
    );
};
