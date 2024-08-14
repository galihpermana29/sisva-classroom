'use client';

import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

// export const metadata = {
//   title: 'Login | Sisva',
//   description: 'Sisva | Solusi Digitalisasi dan Modernisasi Sekolah',
// };

import LogoSisva from '@/assets/Sisva-LogoType-Black.png';
import LoginLibrary from '@/assets/Login-Library.png';
import SchoolLogoBlue from '@/assets/School-Logo-Blue.png';
import { useParams } from 'next/navigation';
import CmsAPI from '@/api/cms';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [profileData, setProfileData] = useState();

  const { slug } = useParams();

  const fetchProfile = async (slug) => {
    try {
      const {
        data: { data },
      } = await CmsAPI.getSchoolByCode(slug);

      setProfileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile(slug);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', maxHeight: '100vh' }}>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          flex: 1,
          height: '100vh',
          position: 'relative',
        }}
      >
        <Image
          alt='Web Image'
          src={`https://api-staging.sisva.id/file/v1/files/${profileData?.landing_image_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
          layout={'fill'}
          objectFit={'cover'}
        />
      </Box>
      <Stack
        sx={{
          maxWidth: { xs: '100%', md: 600 },
          width: '100%',
          padding: { xs: '24px', md: '48px' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack alignItems='center'>
          <Image
            alt='Web Image'
            src={`https://api-staging.sisva.id/file/v1/files/${profileData?.logo_uri}?school_id=0a49a174-9ff5-464d-86c2-3eb1cd0b284e`}
            width={110}
            height={110}
          />
          <Typography fontWeight='700' mt={1} fontSize={24}>
            {profileData?.name}
          </Typography>
          <Stack direction='row' alignItems='center' gap='6px'>
            <Typography variant='body2' color='grey'>
              Powered by
            </Typography>
            <Image alt='Web Image' src={LogoSisva} width={56} height={30} />
          </Stack>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}
