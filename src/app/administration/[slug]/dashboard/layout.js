import { Box } from '@mui/material';
import Container from './components/Container';

export const metadata = {
  title: 'Beranda | Sisva',
  description: 'Sisva | Solusi Digitalisasi dan Modernisasi Sekolah',
};

export default function RootLayout({ children }) {
  return (
    <Box
      sx={{
        height: '100vh',
        maxHeight: '100vh',
        width: '100%',
      }}
    >
      <Container>
        <div className="max-h-[90vh] overflow-auto h-full">{children}</div>
      </Container>
    </Box>
  );
}
