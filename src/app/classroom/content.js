"use client";

import { Box, Button, OutlinedInput, Stack, Typography } from "@mui/material";
import { SchoolCodeIllustration } from "@/assets/SVGs";
import useTheme from "@mui/material/styles/useTheme";

import Link from "next/link";

export default function InsertSchoolCode() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          maxWidth: "600px",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          p: "0 24px",
          alignItems: "center",
        }}
      >
        <SchoolCodeIllustration
          color={theme.palette.warning.main}
          sx={{ maxWidth: "90%", objectFit: "cover", fontSize: 300 }}
        />
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 24,
            color: theme.palette.warning.main,
            mt: 2,
          }}
        >
          Hai, Selamat Datang di SISVA!
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 3 }}>
          Masukkan kode sekolah untuk melanjutkan.
        </Typography>

        <OutlinedInput
          sx={{ maxWidth: "280px", width: "100%" }}
          placeholder="Masukkan Kode Sekolah"
        />

        <button
          className="mt-[2svh] px-[3svh] text-[2svh] lg:text-[2.2svh] w-[100%] max-w-[280px] py-[1.25svh] font-semibold text-white kumb-sans rounded-[1svh]"
          style={{
            background:
              "linear-gradient(142deg, #F96756  11.11%, #F03721  86.15%)",
          }}
        >
          Lanjutkan
        </button>
        {/* <Button
          component={Link}
          href="/administration/SEKOLAHSISVA"
          sx={{ maxWidth: "280px", width: "100%", mt: 1 }}
          variant="contained"
          color=""
        >
          <Typography textTransform={"none"}>Lanjutkan</Typography>
        </Button> */}
      </Stack>
    </Stack>
  );
}
