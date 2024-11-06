import { Typography } from '@mui/material';

export default function FormLabelSisva({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography variant="body2" fontWeight={600} mb={0.5}>
      {children}
    </Typography>
  );
}
