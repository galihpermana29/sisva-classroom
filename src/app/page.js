import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";

import LogoSisva from "@/assets/Sisva-LogoType-White.png";
import Link from "next/link";

export const metadata = {
  title: "Demonstrasi Aplikasi | SISVA",
  description: "Demo aplikasi Sisva",
};

export default function Home() {
  return (
    <Box
      component={"main"}
      sx={{
        backgroundColor: "#11003e",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Box sx={{ height: 200, width: 300, position: "relative" }}>
        <Image
          alt="Web Image"
          src={LogoSisva}
          layout={"fill"}
          objectFit={"contain"}
        />
      </Box>
      <Stack flexDirection={{ xs: "column", md: "row" }} width={450}>
        <Box
          component={Link}
          href="/administration"
          sx={{
            flex: 1,
            mr: { xs: 0, md: 2 },
            backgroundColor: "#1f8cd3",
            padding: 1,
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Sisva Administration
          </Typography>
        </Box>
        <Box
          component={Link}
          href="https://sisva-classroom-app.vercel.app"
          sx={{
            flex: 1,
            backgroundColor: "#f96756",
            padding: 1,
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Sisva Classroom
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
