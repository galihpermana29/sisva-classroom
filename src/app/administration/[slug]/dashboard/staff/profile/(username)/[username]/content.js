'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SchoolLogo from '@/assets/School-Logo-Blue.png';
import LandingImage from '@/assets/Login-Library.png';

import {
  ArrowBackIosNewRounded,
  BorderColorRounded,
} from '@mui/icons-material';

import { useFormik } from 'formik';

import { FormStaffBasic } from './components/FormStaffBasic';
import { FormStaffBiodata } from './components/FormStaffBiodata';
import { FormStaffPassword } from './components/FormStaffPassword';
import Link from 'next/link';
import UsersAPI from '@/api/users';
import { object } from 'yup';
import AuthAPI from '@/api/auth';
import FilesAPI from '@/api/files';

export default function StaffProfileContent({ user_id }) {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const [initialData, setinitialData] = useState({
    name: '',
    username: '',
    type: '',
    permissions: [],
    email: '',
    phone: '',
    gender: '',
    nationality: '',
    personal_id: '',
    education_id: '',
    religion: '',
    address: '',
    profile_image_uri: '',
    old_password: '',
    confirm_old_password: '',
    new_password: '',
    confirm_new_password: '',
  });
  const formik = useFormik({
    initialValues: { ...initialData },

    onSubmit: async (values) => {
      let changePassData = {};

      console.log(values);

      let json_text = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        nationality: values.nationality,
        address: values.address,
        religion: values.religion,
        education_id: values.education_id,
      };

      delete values.username;
      delete values.email;
      delete values.phone;
      delete values.gender;
      delete values.nationality;
      delete values.address;
      delete values.religion;
      delete values.education_id;

      const formatedData = {
        ...values,
        detail: { json_text: JSON.stringify(json_text) },
      };

      for (const keys in values) {
        if (keys.includes('password')) {
          changePassData = { ...changePassData, [`${keys}`]: values[keys] };
        }
      }

      if (!Object.keys(changePassData).length) {
        try {
          const data = await UsersAPI.updateUserById(formatedData, values.id);

          window.location.reload();
        } catch (error) {
          console.log(error, 'update user');
        }
      } else {
        try {
          const user_id = values.id;
          changePassData = { ...changePassData, user_id };

          delete changePassData.id;
          delete changePassData.new_password_confirm;

          if (Object.keys(changePassData).includes('current_password')) {
            try {
              console.log('test');
              await AuthAPI.changeUserPass(changePassData);
            } catch (error) {
              console.log(error, 'change user password');
            }
          } else if (
            Object.keys(changePassData).includes('new_password') &&
            !Object.keys(changePassData).includes('current_password')
          ) {
            try {
              console.log('test');
              await AuthAPI.resetUserPass(changePassData);
            } catch (error) {
              console.log(error, 'reset user password');
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      window.location.reload();
      formik.setValues(initialData);
    },
  });

  let [editing, setEditing] = useState(false);

  const handleImageChange = async (e) => {
    try {
      e.preventDefault();

      const { name } = e.target;
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append('file', file);

      const {
        data: { data },
      } = await FilesAPI.uploadimage(formData);

      formik.setFieldValue(name, data);
    } catch (error) {
      console.log(error, 'error upload user profile');
    }
  };

  const fetchProfile = async (userId, updateCurrentUser = false) => {
    try {
      const {
        data: { data },
      } = await UsersAPI.getUserById(userId);

      if (updateCurrentUser) {
        localStorage.setItem('current_user', JSON.stringify(data));
        return;
      }

      console.log(data);

      const additionalJson = JSON.parse(data.detail.json_text);
      delete data.detail.json_text;

      setinitialData({ ...data, ...additionalJson });
      formik.setValues({ ...data, ...additionalJson });
    } catch (error) {
      console.log(error, 'error fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile(user_id);
  }, []);

  let tabs = [
    {
      title: 'Akun',
      component: <FormStaffBasic formik={formik} editing={editing} />,
    },
    {
      title: 'Biodata',
      component: (
        <FormStaffBiodata
          formik={formik}
          editing={editing}
          handleImageChange={handleImageChange}
        />
      ),
    },
    {
      title: 'Password',
      component: (
        <FormStaffPassword
          formik={formik}
          editing={editing}
          setEditing={setEditing}
          containerRef={containerRef}
          initialData={initialData}
        />
      ),
    },
  ];

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
        <IconButton
          component={Link}
          href='/administration/SEKOLAHSISVA/dashboard/staff/profile/'
          sx={{ borderRadius: 2, mr: 1 }}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Profil Karyawan
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
        <Avatar sx={{ height: 70, width: 70, position: 'relative', mr: 2 }}>
          <Image
            alt='Image'
            src={
              'https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            }
            layout={'fill'}
            objectFit={'cover'}
          />
        </Avatar>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            {initialData.name}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 6500 }}>
            {initialData.name}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        component={Paper}
        ref={containerRef}
        variant='outlined'
        sx={{
          borderRadius: 2,
          flex: 1,
          overflowY: 'hidden',
          maxHeight: '100%',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            borderBottom: '1px solid rgb(0,0,0,0.12)',
            // height: 54,
            overflowX: 'auto',
          }}
        >
          {tabs.map((item, index) => {
            return (
              <Button
                key={index}
                sx={{
                  p: { xs: '16px 12px', lg: 2 },
                  minWidth: { xs: 100, lg: 110 },
                  // height: 54,
                  borderBottom: '2px solid',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor:
                    activeTab === index ? 'primary.main' : 'transparent',
                }}
                onClick={() => {
                  setActiveTab(index);
                  setEditing(false);
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
              </Button>
            );
          })}
        </Stack>
        <Stack
          ref={containerRef}
          variant='outlined'
          sx={{
            flex: 1,
            overflowY: 'scroll',
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
              display: !editing && activeTab !== 2 ? 'flex' : 'none',
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
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          {tabs[activeTab].component}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack
              sx={{
                display: editing && activeTab !== 2 ? 'flex' : 'none',
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
              >
                Simpan
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
