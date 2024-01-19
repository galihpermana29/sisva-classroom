import { Box } from "@mui/material";

import InsertSchoolCode from "./content";

export const metadata = {
  title: "Masukkan Kode Sekolah | SISVA",
  description: "SISVA | Solusi Digitalisasi dan Modernisasi Sekolah",
};

export default function Home() {
  return (
    <Box sx={{height:"100%", width:"100%"}}>
      <InsertSchoolCode/>
    </Box>
  );
}
