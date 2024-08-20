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
import { useParams } from 'next/navigation';

export default function SchoolProfileContent() {
  const { slug } = useParams();

  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const [initialData, setinitialData] = useState({
    name: 'Doni Alamsyah',
    username: 'doni.alamsyah',
    type: 'student',
    permissions: ['report'],
    email: 'doni.alamsyah@sisva.sch.id',
    phone: '082114451440',
    gender: 'male',
    nationality: 'wni',
    personal_id: '3276081004960001',
    education_id: '00121323121',
    religion: 'islam',
    address:
      'Perumahan Bagya C10, RT/RW 002/002, Cilodong, Kalibaru, Depok, Jawa Barat',
    profile_image_uri:
      'https://images.unsplash.com/photo-1695642579321-fcb1fc79b976?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=302&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NzIyMTM4NA&ixlib=rb-4.0.3&q=80&w=300',
    old_password: '',
    confirm_old_password: '',
    new_password: '',
    confirm_new_password: '',
    guardian_type: 'father',
    father_name: 'Budi Utomo',
    father_email: 'budiutomo@gmail.com',
    father_phone: '089620391492',
    father_occupation: 'Dokter',
    father_education: 'graduate',
    father_income: '10-50',
    father_birth_year: '1984',
    father_life_status: 'alive',
    father_religion: 'islam',
    father_address:
      'Perumahan Bagya C10, RT/RW 002/002, Cilodong, Kalibaru, Depok, Jawa Barat',
    mother_name: 'Susi Susanti',
    mother_email: 'susisusanti@gmail.com',
    mother_phone: '08965920292',
    mother_occupation: 'Guru',
    mother_education: 'undergraduate',
    mother_income: '1-10',
    mother_birth_year: '1993',
    mother_life_status: 'alive',
    mother_religion: 'hindu',
    mother_address:
      'Perumahan Bagya C10, RT/RW 002/002, Cilodong, Kalibaru, Depok, Jawa Barat',
  });
  const formik = useFormik({
    initialValues: { ...initialData },
  });

  let [editing, setEditing] = useState(false);

  let tabs = [
    {
      title: 'Akun',
      component: <FormStudentBasic formik={formik} editing={editing} />,
    },
    {
      title: 'Biodata',
      component: <FormStudentBiodata formik={formik} editing={editing} />,
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
          href={`/administration/${slug}/dashboard/student/profile/`}
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
          <Image
            alt='Image'
            src={
              'https://images.unsplash.com/photo-1695642579321-fcb1fc79b976?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=302&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5NzIyMTM4NA&ixlib=rb-4.0.3&q=80&w=300'
            }
            layout={'fill'}
            objectFit={'cover'}
          />
        </Avatar>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            Doni Alamsyah
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 6500 }}>
            doni.alamsyah
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
