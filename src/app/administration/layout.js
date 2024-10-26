'use client';

import CmsAPI from '@/api/cms';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../globals.css';
import { themeConfig } from './theme';

export default function RootLayout({ children }) {
  const { slug } = useParams();

  const [color, setColor] = useState();

  const fetchTheme = async () => {
    const {
      data: { data },
    } = await CmsAPI.getSchoolByCode(slug);

    if (data && data.theme_json_text) setColor(data.theme_json_text);
  };

  if (color) {
    themeConfig.palette.primary.main = color;
  }

  const theme = createTheme(themeConfig);

  useEffect(() => {
    if (slug) fetchTheme();
  }, [slug]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
