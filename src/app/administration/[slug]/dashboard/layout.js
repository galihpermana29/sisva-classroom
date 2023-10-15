import { Box } from "@mui/material";
import Container from "./components/Container";

export const metadata = {
  title: "Beranda | SISVA",
  description: "SISVA | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function RootLayout({ children }) {
  return (
      <Box sx={{ height: "100vh", maxHeight: "100vh", width: "100%" }}>
        <Container>{children}</Container>
      </Box>
  );
}
