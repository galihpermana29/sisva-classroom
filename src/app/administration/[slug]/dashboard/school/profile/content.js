'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Divider,
  Grid,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SchoolLogo from '@/assets/School-Logo-Blue.png';
import LandingImage from '@/assets/Login-Library.png';

import formOneIcon from '@/assets/Icon-Paragraph.svg';
import formThreeIcon from '@/assets/Icon-Document.svg';
import formTwoIcon from '@/assets/Icon-Media.svg';
import { BorderColorRounded } from '@mui/icons-material';

import { useFormik } from 'formik';

import { FormSchoolDetails } from './components/FormSchoolDetails';
import { FormSchoolType } from './components/FormSchoolType';
import { FormSchoolIdentity } from './components/FormSchoolIdentity';
import { schoolProfileFormValidation } from './components/FormValidation';
import CmsAPI from '@/api/cms';
import FilesAPI from '@/api/files';

export default function SchoolProfileContent() {
  const containerRef = useRef(null);

  const [initialData, setinitialData] = useState({});
  const { name = '', abbreviation = '', logo_uri = '' } = initialData ?? {};

  const [editing, setEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState({
    visible: false,
    message: '',
    severity: '',
  });

  const formik = useFormik({
    initialValues: { ...initialData },
    // validationSchema: schoolProfileFormValidation,

    onSubmit: async (values) => {
      const { email, nomorTelepon, alamat, kepemilikanSekolah } = values;

      console.log(values);

      const payload = {
        ...values,
        additional_json_text: JSON.stringify({
          email,
          nomorTelepon,
          alamat,
          kepemilikanSekolah,
        }),
      };

      delete payload.email;
      delete payload.nomorTelepon;
      delete payload.kepemilikanSekolah;
      delete payload.alamat;
      delete payload.id;

      try {
        await CmsAPI.editSchoolById(values.id, payload);

        // setSnackbarOpen({
        //   visible: true,
        //   message: 'Data is updated successfully',
        //   severity: 'success',
        // });

        window.location.reload();
      } catch (error) {
        console.log('Submitted', error);

        // if (error.code === 'ERR_BAD_REQUEST') {
        //   setSnackbarOpen({
        //     visible: true,
        //     message: 'Unauthorized',
        //     severity: 'error',
        //   });
        // } else {
        //   setSnackbarOpen({
        //     visible: true,
        //     message: 'Network Error',
        //     severity: 'error',
        //   });
        // }
      }
    },
  });

  const handleImageChange = async (e) => {
    e.preventDefault();

    const { name } = e.target;
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);

    try {
      const {
        data: { data },
      } = await FilesAPI.uploadimage(formData);

      formik.setFieldValue(name, 'file://' + data);

      // setSnackbarOpen({
      //   visible: true,
      //   message: 'Image uploaded successfully',
      //   severity: 'success',
      // });
    } catch (error) {
      console.error('File upload failed:', error);
      // if (error.code === 'ERR_BAD_REQUEST') {
      //   setSnackbarOpen({
      //     visible: true,
      //     message: 'Unauthorized',
      //     severity: 'error',
      //   });
      // } else {
      //   setSnackbarOpen({
      //     visible: true,
      //     message: 'Error file is too large',
      //     severity: 'error',
      //   });
      // }
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const {
          data: { data },
        } = await CmsAPI.getSchoolById(
          JSON.parse(localStorage.getItem('user')).school_id
        );

        const addtionalJson = JSON.parse(data.additional_json_text);

        formik.setValues({ ...data, ...addtionalJson });
        setinitialData({ ...data, ...addtionalJson });
      } catch (error) {
        console.log(error, 'error fetch school profile');
      }
    };

    getProfileData();
  }, []);

  return (
    <Stack sx={{ height: '100%', width: '100%', p: { xs: 2, lg: 4 } }}>
      <Stack
        sx={{
          flexDirection: 'row',
          display: { xs: 'none', lg: 'flex' },
          mb: 2,
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Profil Sekolah
        </Typography>
      </Stack>
      <Stack
        component={Paper}
        variant='outlined'
        sx={{
          padding: { xs: '16px', md: '16px 32px' },
          borderRadius: 2,
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ height: 70, width: 70, position: 'relative', mr: 2 }}>
          <Image
            alt='Image'
            src={logo_uri}
            layout={'fill'}
            objectFit={'contain'}
          />
        </Box>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{name}</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 6500 }}>
            {abbreviation}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        component={Paper}
        ref={containerRef}
        variant='outlined'
        sx={{
          borderRadius: 2,
          overflowY: 'scroll',
          flex: 1,
          maxHeight: '100%',
          position: 'relative',
          pb: 2,
        }}
      >
        {' '}
        <Button
          variant='outlined'
          size='small'
          fullWidth={false}
          startIcon={<BorderColorRounded />}
          onClick={() => {
            setEditing(true);
            containerRef.current.scrollTo({ top: 0 });
          }}
          sx={{
            display: !editing ? 'flex' : 'none',
            padding: '8px 14px',
            position: 'fixed',
            width: 'fit-content',
            justifySelf: 'flex-end',
            right: { xs: 32, md: 48, lg: 64 },
            mt: 2,
            backgroundColor: 'white',
          }}
        >
          <Box component={'span'}>Edit</Box>
        </Button>
        <Stack id='school_form' direction={'row'} width='100%'>
          <Stack width='100%'>
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  sx={{
                    padding: '16px',
                    mt: 1,
                  }}
                >
                  <Grid item xs={11}>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: '20px',
                          marginTop: '5px',
                          mb: '8px',
                        }}
                      >
                        <Image
                          src={formOneIcon}
                          height={20}
                          width={20}
                          alt='icon'
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <FormSchoolDetails
                            formik={formik}
                            editing={editing}
                            handleImageChange={handleImageChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  sx={{
                    padding: '16px',
                    mt: 1,
                  }}
                >
                  <Grid item xs={11}>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: '20px',
                          marginTop: '5px',
                          mb: '8px',
                        }}
                      >
                        <Image
                          src={formTwoIcon}
                          height={20}
                          width={20}
                          alt='icon'
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <FormSchoolType formik={formik} editing={editing} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  sx={{
                    padding: '16px',
                    mt: 1,
                  }}
                >
                  <Grid item xs={11}>
                    <Grid container>
                      <Grid
                        item
                        sx={{
                          marginRight: '20px',
                          marginTop: '5px',
                          mb: '8px',
                        }}
                      >
                        <Image
                          src={formThreeIcon}
                          height={20}
                          width={20}
                          alt='icon'
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <FormSchoolIdentity
                            formik={formik}
                            editing={editing}
                            handleImageChange={handleImageChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: editing ? 'flex' : 'none',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            p: { sm: '0 16px', md: '0 32px' },
            mb: 2,
          }}
        >
          <Button
            variant='outlined'
            sx={{ mr: 1, width: 120 }}
            onClick={() => {
              setEditing(false);
              formik.setValues(initialData);
              containerRef.current.scrollTo({ top: 0 });
            }}
          >
            Batal
          </Button>
          <Button
            variant='contained'
            sx={{ width: 120 }}
            onClick={() => {
              setEditing(false);
              formik.handleSubmit();
              containerRef.current.scrollTo({ top: 0 });
            }}
            type='submit'
          >
            Simpan
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
