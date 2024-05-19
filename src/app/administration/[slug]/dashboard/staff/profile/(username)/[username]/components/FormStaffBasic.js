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

import { formStaffBasicFields } from '@/globalcomponents/FormFields';
import { Cancel } from '@mui/icons-material';
import { useState } from 'react';
import { permissions, types } from '@/globalcomponents/Variable';

export const FormStaffBasic = ({ formik, editing }) => {
  function RenderType({ type }) {
    let tempType;
    types.map((item) => {
      if (item.slug === type) {
        tempType = item.title;
      }
    });
    return tempType;
  }
  function RenderPermissions({ params }) {
    return (
      <Stack
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          overflow: 'hidden',
          mt: 0.5,
        }}
      >
        {params.map((permission, index) => {
          let tempPermission;
          permissions.map((item) => {
            if (item.slug === permission) {
              tempPermission = item.title;
            }
          });
          return (
            <Chip
              key={index}
              sx={{
                mr: '4px',
                mb: '4px',
                fontSize: 12,
              }}
              label={tempPermission}
              color='primary'
            />
          );
        })}
      </Stack>
    );
  }
  if (!editing) {
    return (
      <>
        {formStaffBasicFields.map((field) =>
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
                  {formik.values[field.name]}
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
                  <RenderType type={formik.values[field.name]} />
                </Typography>
              </Grid>
            </Grid>
          ) : field.type === 'multiple-select' ? (
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
                <RenderPermissions params={formik.values[field.name]} />
              </Grid>
            </Grid>
          ) : null
        )}
      </>
    );
  } else
    return (
      <>
        {formStaffBasicFields.map((field) =>
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
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                }}
              >
                {field.data.map((option) => (
                  <MenuItem key={option.slug} value={option.slug}>
                    <Typography fontSize={14}>{option.title}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : field.type === 'multiple-select' ? (
            <Grid item xs={12} md={field.md} key={field.name}>
              <Typography variant='body2' fontWeight={600} mb={1}>
                {field.label}
              </Typography>

              <FormControl sx={{ width: '100%' }}>
                {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
                <Select
                  multiple
                  value={formik.values[field.name]}
                  onChange={(e) =>
                    formik.setFieldValue(field.name, e.target.value)
                  }
                  input={<OutlinedInput sx={{ p: 0 }} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((permission) => {
                        let tempPermission;
                        permissions.map((item) => {
                          if (item.slug === permission) {
                            tempPermission = item.title;
                          }
                        });
                        return (
                          <Chip
                            key={permission}
                            label={tempPermission}
                            color='primary'
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    transformOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                  }}
                >
                  {field.data.map((option) => (
                    <MenuItem key={option.slug} value={option.slug}>
                      <Typography fontSize={14}>{option.title}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null
        )}
      </>
    );
};
