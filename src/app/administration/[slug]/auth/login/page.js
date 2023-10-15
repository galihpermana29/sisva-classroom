"use client";
import React, { useState } from "react";

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
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack sx={{ width: "100%", mt: 4, mb: 2 }}>
      <Stack mb={2}>
        <Typography fontSize={18} fontWeight="bold">
          Login
        </Typography>
        <Typography variant="body2" color="grey">
          Silakan masukkan detail akun anda.
        </Typography>
      </Stack>
      <Stack
        component="form"
        sx={{
          gap: "8px",
          mb: 2,
        }}
      >
        <Stack
          sx={{
            gap: "8px",
          }}
        >
          <Typography variant="body2" fontWeight="500">
            Username
          </Typography>
          <OutlinedInput placeholder="Masukkan Username" />
        </Stack>
        <Stack
          sx={{
            gap: "8px",
          }}
        >
          <Typography variant="body2" fontWeight="500">
            Password
          </Typography>
          <FormControl variant="outlined">
            <OutlinedInput
              id="outlined-adornment-password"
              placeholder="Masukkan Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel control={<Checkbox />} label="Ingat Saya" />
        </Stack>
      </Stack>
      <Button
        component={Link}
        href="/administration/SEKOLAHSISVA/dashboard"
        variant="contained"
      >
        <Typography textTransform={"none"}>Masuk</Typography>
      </Button>
      <Typography variant="body2" mt={3} align="center">
        Tidak bisa masuk?
      </Typography>

      <Typography
        component={Link}
        href="/administration/SEKOLAHSISVA/auth/information"
        color="primary"
        variant="body2"
        fontWeight="500"
        align="center"
      >
        Lihat informasi selengkapnya.
      </Typography>
    </Stack>
  );
}
