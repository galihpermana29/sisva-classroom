import FormControlSisva from '@/components/FormControlSisva';
import FormLabelSisva from '@/components/FormLabelSisva';
import { useExtracurricularMembers } from '@/hooks/useExtracurricularMembers';
import { useExtracurriculars } from '@/hooks/useExtracurriculars';
import { useStudents } from '@/hooks/useStudents';
import { TextField } from '@mui/material';

export default function FormEditMember({
  selectedExtraCurricularId,
  selectedStudentId,
}: {
  selectedExtraCurricularId: string;
  selectedStudentId: string;
}) {
  const { data: extracurricular } = useExtracurriculars();
  const { data: extracurricularMembers } = useExtracurricularMembers();
  const { data: students } = useStudents();

  return (
    <FormControlSisva>
      <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
      <TextField />
      <FormLabelSisva>Anggota</FormLabelSisva>
      <TextField />
    </FormControlSisva>
  );
}
