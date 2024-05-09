'use client';
import React, { useState } from 'react';

import {
  Box,
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import Auth from '@/api/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [schoolId, setSchoolId] = useState(
    '0a49a174-9ff5-464d-86c2-3eb1cd0b284e'
  );

  async function login() {
    let payload = JSON.stringify({
      username: username,
      password: password,
      school_id: schoolId,
    });

    try {
      const {
        data: { data },
      } = await Auth.login(payload);

      if (data) {
        localStorage.setItem('user', JSON.stringify(data));

        if (JSON.parse(localStorage.getItem('user'))) {
          router.push('/administration/SEKOLAHSISVA/dashboard');
        }
      }
    } catch (error) {
      console.log(error, 'login error');
    }
  }

  return (
    <Stack sx={{ width: '100%', mt: 4, mb: 2 }}>
      <Stack mb={2}>
        <Typography fontSize={18} fontWeight='bold'>
          Login
        </Typography>
        <Typography variant='body2' color='grey'>
          Silakan masukkan detail akun anda.
        </Typography>
      </Stack>
      <Stack
        component='form'
        sx={{
          gap: '8px',
          mb: 2,
        }}
      >
        <Stack
          sx={{
            gap: '8px',
          }}
        >
          <Typography variant='body2' fontWeight='500'>
            Username
          </Typography>
          <OutlinedInput
            placeholder='Masukkan Username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Stack>
        <Stack
          sx={{
            gap: '8px',
          }}
        >
          <Typography variant='body2' fontWeight='500'>
            Password
          </Typography>
          <FormControl variant='outlined'>
            <OutlinedInput
              id='outlined-adornment-password'
              placeholder='Masukkan Password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
        </Stack>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <FormControlLabel control={<Checkbox />} label='Ingat Saya' />
        </Stack>
      </Stack>
      <Button
        // component={Link}
        // href='/administration/SEKOLAHSISVA/dashboard'
        onClick={() => {
          login();
        }}
        variant='contained'
      >
        <Typography textTransform={'none'}>Masuk</Typography>
      </Button>
      <Typography variant='body2' mt={3} align='center'>
        Tidak bisa masuk?
      </Typography>

      <Typography
        component={Link}
        href='/administration/SEKOLAHSISVA/auth/information'
        color='primary'
        variant='body2'
        fontWeight='500'
        align='center'
      >
        Lihat informasi selengkapnya.
      </Typography>
    </Stack>
  );
}
