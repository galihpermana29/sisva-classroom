'use client';

import '../globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { themeConfig } from './theme';
import { useEffect, useState } from 'react';
import CmsAPI from '@/api/cms';

export default function RootLayout({ children }) {
  const [color, setColor] = useState();
  const [user, setUser] = useState();

  const fetchTheme = async () => {
    const {
      data: { data },
    } = await CmsAPI.getSchoolById(
      JSON.parse(localStorage.getItem('user')).school_id
    );

    setColor(data.theme_json_text);
  };

  if (color) {
    themeConfig.palette.primary.main = color;
  }

  const theme = createTheme(themeConfig);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      fetchTheme();
    }
  }, []);

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
