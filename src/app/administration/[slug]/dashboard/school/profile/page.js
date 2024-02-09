import { Box } from "@mui/material";

import SchoolProfileContent from "./content";

export const metadata = {
  title: "Profil Sekolah | Sisva",
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <Box sx={{height:"100%", width:"100%"}}>
      <SchoolProfileContent />
    </Box>
  );
}
