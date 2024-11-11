import { Box } from "@mui/material";

import StaffProfileListContent from "./content";

export const metadata = {
  title: "Buat Rapot | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <StaffProfileListContent />
    </Box>
  );
}
