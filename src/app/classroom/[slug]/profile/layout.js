import { Box } from "@mui/material";
import Container from "../components/Container";

export const metadata = {
  title: "Beranda | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function RootLayout({ children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        maxHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
}
