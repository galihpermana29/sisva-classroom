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

import { FormStudentBasic } from './components/FormStudentBasic';
import { FormStudentBiodata } from './components/FormStudentBiodata';
import { FormStudentParents } from './components/FormStudentParents';
import { FormStudentPassword } from './components/FormStudentPassword';
import Link from 'next/link';
import UsersAPI from '@/api/users';
import AuthAPI from '@/api/auth';
import FilesAPI from '@/api/files';

export default function SchoolProfileContent({ user_id }) {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const [initialData, setinitialData] = useState({});
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
        personal_id: values.personal_id,
        guardian_type: values.guardian_type,
        father_name: values.father_name,
        father_email: values.father_email,
        father_phone: values.father_phone,
        father_occupation: values.father_occupation,
        father_education: values.father_education,
        father_income: values.father_income,
        father_birth_year: values.father_birth_year,
        father_life_status: values.father_life_status,
        father_religion: values.father_religion,
        father_address: values.father_address,
        mother_name: values.mother_name,
        mother_occupation: values.mother_occupation,
        mother_email: values.mother_email,
        mother_education: values.mother_education,
        mother_income: values.mother_income,
        mother_phone: values.mother_phone,
        mother_life_status: values.mother_life_status,
        mother_birth_year: values.mother_birth_year,
        mother_religion: values.mother_religion,
        mother_address: values.mother_address,
        guardian_name: values.guardian_name,
        guardian_gender: values.guardian_gender,
        guardian_relationship: values.guardian_relationship,
        guardian_occupation: values.guardian_occupation,
        guardian_education: values.guardian_education,
        guardian_income: values.guardian_income,
        guardian_phone: values.guardian_phone,
        guardian_email: values.guardian_email,
        guardian_birth_year: values.guardian_birth_year,
        guardian_life_status: values.guardian_life_status,
        guardian_religion: values.guardian_religion,
        guardian_address: values.guardian_address,
      };

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
              await AuthAPI.changeUserPass(changePassData);
            } catch (error) {
              console.log(error, 'change user password');
            }
          } else if (
            Object.keys(changePassData).includes('new_password') &&
            !Object.keys(changePassData).includes('current_password')
          ) {
            try {
              await AuthAPI.resetUserPass(changePassData);
            } catch (error) {
              console.log(error, 'reset user password');
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      // window.location.reload();
      formik.setValues(initialData);
    },
  });

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

  let [editing, setEditing] = useState(false);

  let tabs = [
    {
      title: 'Akun',
      component: <FormStudentBasic formik={formik} editing={editing} />,
    },
    {
      title: 'Biodata',
      component: (
        <FormStudentBiodata
          formik={formik}
          editing={editing}
          handleImageChange={handleImageChange}
        />
      ),
    },
    {
      title: 'Wali Murid',
      component: <FormStudentParents formik={formik} editing={editing} />,
    },
    {
      title: 'Password',
      component: (
        <FormStudentPassword
          formik={formik}
          editing={editing}
          setEditing={setEditing}
          containerRef={containerRef}
          initialData={initialData}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchProfile = async (userId, updateCurrentUser = false) => {
      try {
        const {
          data: { data },
        } = await UsersAPI.getUserById(userId);

        if (updateCurrentUser) {
          localStorage.setItem('current_user', JSON.stringify(data));
          return;
        }

        const additionalJson = JSON.parse(data.detail.json_text);

        setinitialData({ ...data, ...additionalJson });
        formik.setValues({ ...data, ...additionalJson });
      } catch (error) {
        console.log(error, 'error fetch profile');
      }
    };

    fetchProfile(user_id);
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
        <IconButton
          component={Link}
          href='/administration/SEKOLAHSISVA/dashboard/student/profile/'
          sx={{ borderRadius: 2, mr: 1 }}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Profil Siswa
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
          {initialData.profile_image_uri !== '' ? (
            <Image
              alt='Image'
              src={`https://api-staging.sisva.id/file/v1/files/${initialData.profile_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
              layout={'fill'}
              objectFit={'cover'}
            />
          ) : (
            initialData.name.toUpperCase().slice(0, 1)
          )}
        </Avatar>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            {initialData.name}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 6500 }}>
            {initialData.username}
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
              display: !editing && activeTab !== 3 ? 'flex' : 'none',
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
                    pr: 0,
                    mt: 1,
                  }}
                >
                  <Grid item xs={editing ? 12 : 12}>
                    <Grid container>
                      <Grid item xs={editing ? 12 : 12}>
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          {tabs[activeTab].component}
                          {/* <FormSchoolDetails
                            formik={formik}
                            editing={editing}
                          /> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack
              sx={{
                display: editing && activeTab !== 3 ? 'flex' : 'none',
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
