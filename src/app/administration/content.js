'use client';

import { Box, Button, OutlinedInput, Stack, Typography } from '@mui/material';
import { SchoolCodeIllustration } from '@/assets/SVGs';
import useTheme from '@mui/material/styles/useTheme';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InsertSchoolCode() {
  const theme = useTheme();
  const router = useRouter();

  let [code, setCode] = useState('');
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          maxWidth: '600px',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          p: '0 24px',
          alignItems: 'center',
        }}
      >
        <SchoolCodeIllustration
          color={theme.palette.primary.main}
          sx={{ maxWidth: '90%', objectFit: 'cover', fontSize: 300 }}
        />
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 24,
            color: 'primary.main',
            mt: 2,
          }}
        >
          Hai, Selamat Datang di Sisva!
        </Typography>
        <Typography sx={{ textAlign: 'center', mb: 3 }}>
          Masukkan kode sekolah untuk melanjutkan.
        </Typography>

        <OutlinedInput
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{ maxWidth: '280px', width: '100%' }}
          placeholder='Masukkan Kode Sekolah'
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              router.push(`/administration/${code}/auth/login`);
            }
          }}
        />
        <Button
          sx={{ maxWidth: '280px', width: '100%', mt: 1 }}
          variant='contained'
          onClick={() => {
            router.push(`/administration/${code}/auth/login`);
          }}
        >
          <Typography textTransform={'none'}>Lanjutkan</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}
