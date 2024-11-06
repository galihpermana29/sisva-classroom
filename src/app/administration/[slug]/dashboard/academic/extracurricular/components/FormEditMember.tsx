import FormControlSisva from '@/components/FormControlSisva';
import FormLabelSisva from '@/components/FormLabelSisva';
import { TextField } from '@mui/material';

export default function FormEditMember({
  selectedExtraCurricularId,
  selectedStudentId,
}: {
  selectedExtraCurricularId: string;
  selectedStudentId: string;
}) {
  return (
    <FormControlSisva>
      <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
      <TextField />
      <FormLabelSisva>Anggota</FormLabelSisva>
      <TextField />
    </FormControlSisva>
  );
}
