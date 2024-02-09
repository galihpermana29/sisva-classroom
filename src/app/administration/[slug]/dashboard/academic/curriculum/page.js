import { Box } from "@mui/material";

import StaffProfileContent from "./content";

export const metadata = {
  title: "Kurikulum | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <Box sx={{height:"100%", width:"100%"}}>
      <StaffProfileContent />
    </Box>
  );
}
