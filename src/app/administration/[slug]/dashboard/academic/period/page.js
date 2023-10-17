import { Box } from "@mui/material";

import StaffProfileContent from "./content";

export const metadata = {
  title: "Program Studi | SISVA",
  description: "SISVA | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <Box sx={{height:"100%", width:"100%"}}>
      <StaffProfileContent />
    </Box>
  );
}
