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
        gap: 0.5,
      }}
    >
      {children}
    </Stack>
  );
}
