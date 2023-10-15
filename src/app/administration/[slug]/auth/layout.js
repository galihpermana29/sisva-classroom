import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export const metadata = {
  title: "Login | SISVA",
  description: "SISVA | Solusi Digitalisasi dan Modernisasi Sekolah",
};

import LogoSisva from "@/assets/Sisva-LogoType-Black.png";
import LoginLibrary from "@/assets/Login-Library.png";
import SchoolLogoBlue from "@/assets/School-Logo-Blue.png";

export default function RootLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", maxHeight: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          flex: 1,
          height: "100vh",
          position: "relative",
        }}
      >
        <Image
          alt="Web Image"
          src={LoginLibrary}
          layout={"fill"}
          objectFit={"cover"}
        />
      </Box>
      <Stack
        sx={{
          maxWidth: { xs: "100%", md: 600 },
          width: "100%",
          padding: { xs: "24px", md: "48px" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack alignItems="center">
          <Image
            alt="Web Image"
            src={SchoolLogoBlue}
            width={110}
            height={110}
          />
          <Typography fontWeight="700" mt={1} fontSize={24}>
            Sekolah SISVA
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
