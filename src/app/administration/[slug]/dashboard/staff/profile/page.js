import { Box } from "@mui/material";

import StaffProfileListContent from "./content";

export const metadata = {
  title: "Daftar Karyawan | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <Box sx={{height:"100%", width:"100%"}}>
      <StaffProfileListContent />
    </Box>
  );
}
