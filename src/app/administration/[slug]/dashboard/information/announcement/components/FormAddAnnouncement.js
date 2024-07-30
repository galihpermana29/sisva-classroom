'use client';

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
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
  formAddAnnouncement,
  formAddStaffFields,
} from '@/globalcomponents/FormFields';
import { Cancel, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { permissions } from '@/globalcomponents/Variable';

export const FormAddAnnouncement = ({
  formik,
  editing,
  handleFileChange = () => {},
}) => {
  return (
    <>
      {formAddAnnouncement.map((field) =>
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
        ) : field.type === 'textField' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              multiline
              rows={4}
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
            />
          </Stack>
        ) : field.type === 'file' ? (
          <Grid xs={12} item key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <Stack
              sx={{
                my: 1,
                flex: 1,
                // alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  p: 1,
                  width: 'fit-content',
                  backgroundColor: 'base.base20',
                  borderRadius: 2,
                  alignSelf: 'center',
                }}
              >
                <Box
                  sx={{
                    height: 96,
                    width: 96,
                    position: 'relative',
                  }}
                >
                  <Image
                    alt='Image'
                    src={`https://api-staging.sisva.id/file/v1/files/${formik.values.image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
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
                  {formik.values.logo_uri ? 'Ubah' : 'Upload'}
                  <input
                    name={'image_uri'}
                    accept='image/*'
                    id='image-input'
                    type='file'
                    style={{
                      position: 'absolute',
                      opacity: '0',
                    }}
                    onChange={handleFileChange}
                  />
                </Button>
              </label>
              <Button
                onClick={() => {
                  formik.setFieldValue('image_uri', '');
                }}
                fullWidth
                variant='outlined'
                size='small'
              >
                Hapus
              </Button>
            </Stack>
          </Grid>
        ) : null
      )}
    </>
  );
};
