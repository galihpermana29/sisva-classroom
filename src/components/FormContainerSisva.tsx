import { Stack } from '@mui/material';

export default function FormContainerSisva({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      sx={{
        py: 1,
        px: 2,
        gap: 0.5,
      }}
    >
      {children}
    </Stack>
  );
}
