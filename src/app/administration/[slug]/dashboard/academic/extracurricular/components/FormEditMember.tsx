import FormControlSisva from '@/components/FormControlSisva';
import FormLabelSisva from '@/components/FormLabelSisva';
import { TextField } from '@mui/material';

export default function FormEditMember() {
  return (
    <FormControlSisva>
      <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
      <TextField />
      <FormLabelSisva>Anggota</FormLabelSisva>
      <TextField />
    </FormControlSisva>
  );
}
