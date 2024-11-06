import { FormControl } from '@mui/material';
import FormContainerSisva from './FormContainerSisva';

export default function FormControlSisva({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormControl fullWidth>
      <FormContainerSisva>{children}</FormContainerSisva>
    </FormControl>
  );
}
