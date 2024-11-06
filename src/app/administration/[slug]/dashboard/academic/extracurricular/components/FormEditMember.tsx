import FormControlSisva from '@/components/FormControlSisva';
import FormLabelSisva from '@/components/FormLabelSisva';
import { useExtracurricularMembers } from '@/hooks/useExtracurricularMembers';
import { useExtracurriculars } from '@/hooks/useExtracurriculars';
import { useStudents } from '@/hooks/useStudents';
import { MenuItem, TextField } from '@mui/material';

export default function FormEditMember({
  selectedExtraCurricularId,
  selectedStudentId,
}: {
  selectedExtraCurricularId: string;
  selectedStudentId: string;
}) {
  const { data: extracurriculars, isLoading: isLoading1 } =
    useExtracurriculars();
  const { data: extracurricularMembers, isLoading: isLoading2 } =
    useExtracurricularMembers();
  const { data: students, isLoading: isLoading3 } = useStudents();

  // skeleton
  if (isLoading1 || isLoading2 || isLoading3) {
    return (
      <FormControlSisva>
        <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
        <TextField disabled />
        <FormLabelSisva>Anggota</FormLabelSisva>
        <TextField disabled></TextField>
      </FormControlSisva>
    );
  }

  return (
    <FormControlSisva>
      <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
      <TextField select value={selectedExtraCurricularId}>
        {extracurriculars.map((extracurricular) => {
          return (
            <MenuItem key={extracurricular.id} value={extracurricular.id}>
              {extracurricular.name}
            </MenuItem>
          );
        })}
      </TextField>
      <FormLabelSisva>Anggota</FormLabelSisva>
      <TextField select value={selectedStudentId} disabled>
        {students.map((student) => {
          return (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          );
        })}
      </TextField>
    </FormControlSisva>
  );
}
