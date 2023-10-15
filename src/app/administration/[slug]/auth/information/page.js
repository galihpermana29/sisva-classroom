"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Stack, Typography, List, ListItem } from "@mui/material";

import {
  ArrowBackIosNewRounded,
} from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack sx={{ width: "100%", mt: 4, mb: 2 }}>
      <Stack>
        <Typography fontSize={18} fontWeight="bold">
          Informasi Akun
        </Typography>
        <Typography variant="body2" color="grey">
          Berikut adalah beberapa informasi umum yang perlu diketahui.
        </Typography>
      </Stack>
      <List
        sx={{
          listStyleType: "disc",
          pl: 2,
          mb: 1,
          fontSize:14
        }}
      >
        <ListItem
          sx={{
            display: "list-item",
          }}
        >
          Akun SISVA hanya diberikan kepada sekolah yang telah bekerjasama
          dengan aplikasi SISVA.
        </ListItem>
        <ListItem
          sx={{
            display: "list-item",
          }}
        >
          Akun SISVA dibuat dan dikelola oleh administrator sekolah.
        </ListItem>
        <ListItem
          sx={{
            display: "list-item",
          }}
        >
          Untuk pembuatan akun SISVA, silakan menghubungi administrator sekolah.
        </ListItem>
        <ListItem
          sx={{
            display: "list-item",
          }}
        >
          Jika lupa password akun SISVA, silakan menghubungi administrator
          sekolah.
        </ListItem>
      </List>
      <Button
        component={Link}
        href="/administration/SEKOLAHSISVA/auth/login"
        variant="contained"
      >
        <Stack flexDirection={"row"} alignItems={"center"} width="100%">
          <ArrowBackIosNewRounded sx={{ fontSize: 16 }} />
          <Typography flex={1} textTransform={"none"} textAlign={"center"}>
            Kembali ke halaman Login
          </Typography>
        </Stack>
      </Button>
    </Stack>
  );
}
