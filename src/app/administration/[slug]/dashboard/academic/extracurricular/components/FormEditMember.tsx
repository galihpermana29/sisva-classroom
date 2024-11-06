import FormControlSisva from '@/components/FormControlSisva';
import FormLabelSisva from '@/components/FormLabelSisva';
import { useExtracurricularMembers } from '@/hooks/useExtracurricularMembers';
import { useExtracurriculars } from '@/hooks/useExtracurriculars';
import { useStudents } from '@/hooks/useStudents';
import { Button, Divider, MenuItem, Stack, TextField } from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

type FormEditMember = {
  extracurricularId: string;
  studentId: string;
};

export default function FormEditMember({
  selectedExtraCurricularId,
  selectedStudentId,
  onClickCancel,
  onClickSave,
}: {
  selectedExtraCurricularId: string;
  selectedStudentId: string;
  onClickCancel: () => void;
  onClickSave: () => void;
}) {
  const { data: extracurriculars, isLoading: isLoading1 } =
    useExtracurriculars();
  const { data: extracurricularMembers, isLoading: isLoading2 } =
    useExtracurricularMembers();
  const { data: students, isLoading: isLoading3 } = useStudents();

  const { handleSubmit, control } = useForm<FormEditMember>({
    defaultValues: {
      extracurricularId: selectedExtraCurricularId,
      studentId: selectedStudentId,
    },
  });

  const onSubmit: SubmitHandler<FormEditMember> = (data) => {
    console.log(data);
  };

  // skeleton
  if (isLoading1 || isLoading2 || isLoading3) {
    return (
      <>
        <FormControlSisva>
          <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
          <TextField disabled />
          <FormLabelSisva>Anggota</FormLabelSisva>
          <TextField disabled></TextField>
        </FormControlSisva>
        <Divider />
        <Stack sx={{ flexDirection: 'row', gap: 1, p: 2 }}>
          <Button fullWidth variant="outlined">
            Batal
          </Button>
          <Button fullWidth variant="contained">
            Simpan
          </Button>
        </Stack>
      </>
    );
  }

  return (
    <>
      <FormControlSisva>
        <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
        <Controller
          name="extracurricularId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
              {extracurriculars.map((extracurricular) => {
                return (
                  <MenuItem key={extracurricular.id} value={extracurricular.id}>
                    {extracurricular.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        ></Controller>
        <FormLabelSisva>Anggota</FormLabelSisva>
        <Controller
          name="studentId"
          control={control}
          render={({ field }) => (
            <TextField select {...field} disabled>
              {students.map((student) => {
                return (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        ></Controller>
      </FormControlSisva>
      <Divider />
      <Stack sx={{ flexDirection: 'row', gap: 1, p: 2 }}>
        <Button onClick={onClickCancel} fullWidth variant="outlined">
          Batal
        </Button>
        <Button
          onClick={() => {
            handleSubmit(onSubmit)();
            onClickSave();
          }}
          fullWidth
          variant="contained"
        >
          Simpan
        </Button>
      </Stack>
    </>
  );
}
