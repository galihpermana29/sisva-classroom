import { Box } from '@mui/material';

import SchoolProfileContent from './content';

export const metadata = {
  title: 'Profil Siswa | Sisva',
  description: 'Sisva | Solusi Digitalisasi dan Modernisasi Sekolah',
};

export default function Home({ params }) {
  const user_id = params.username;

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <SchoolProfileContent user_id={user_id} />
    </Box>
  );
}
