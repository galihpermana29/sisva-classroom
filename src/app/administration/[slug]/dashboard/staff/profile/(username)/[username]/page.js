import { Box } from '@mui/material';

import StaffProfileContent from './content';

export const metadata = {
  title: 'Profil Karyawan | Sisva',
  description: 'Sisva | Solusi Digitalisasi dan Modernisasi Sekolah',
};

export default function Home({ params }) {
  const user_id = params.username;

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <StaffProfileContent user_id={user_id} />
    </Box>
  );
}
