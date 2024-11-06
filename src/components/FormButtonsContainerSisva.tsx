import { Stack } from '@mui/material';

export default function FormButtonsContainerSisva({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Stack sx={{ flexDirection: 'row', gap: 1, p: 2 }}>{children}</Stack>;
}
