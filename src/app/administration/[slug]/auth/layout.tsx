'use client';

import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import LogoSisva from '@/assets/Sisva-LogoType-Black.png';
import { useSchool } from '../SchoolContext';

export default function RootLayout({ children }) {
  const school = useSchool();

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
        {school.landing_image_url && (
          <Image
            alt="Landing Page Background"
            src={school.landing_image_url}
            layout={'fill'}
            objectFit={'cover'}
          />
        )}
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
        <Stack alignItems="center">
          <Typography fontWeight="700" mt={1} fontSize={24}>
            {school.name}
          </Typography>
          <Stack direction="row" alignItems="center" gap="6px">
            <Typography variant="body2" color="grey">
              Powered by
            </Typography>
            <Image alt="Web Image" src={LogoSisva} width={56} height={30} />
          </Stack>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}
