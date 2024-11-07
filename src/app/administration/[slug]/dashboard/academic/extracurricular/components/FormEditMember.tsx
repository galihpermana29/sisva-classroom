import AcademicAPI from '@/api/academic';
import FormButtonsContainerSisva from '@/components/FormButtonsContainerSisva';
import FormContainerSisva from '@/components/FormContainerSisva';
import FormLabelSisva from '@/components/FormLabelSisva';
import { useExtracurriculars } from '@/hooks/useExtracurriculars';
import { useStudents } from '@/hooks/useStudents';
import { Button, Divider, MenuItem, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

type FormEditMember = {
  extracurricularId: string;
  studentId: string;
};

export default function FormEditMember({
  selectedExtracurricularId,
  selectedStudentId,
  onClickCancel,
  onClickSave,
}: {
  selectedExtracurricularId: string;
  selectedStudentId: string;
  onClickCancel: () => void;
  onClickSave: () => void;
}) {
  const queryClient = useQueryClient();
  const { data: extracurriculars, isLoading: isLoading1 } =
    useExtracurriculars();
  const { data: students, isLoading: isLoading2 } = useStudents();

  const { handleSubmit, control } = useForm<FormEditMember>({
    defaultValues: {
      extracurricularId: selectedExtracurricularId,
      studentId: selectedStudentId,
    },
  });

  const onSubmit: SubmitHandler<FormEditMember> = async (data) => {
    await AcademicAPI.deleteStudentInExtra(selectedExtracurricularId, {
      student_id: data.studentId,
    });

    await AcademicAPI.createStudentInExtra(data.extracurricularId, {
      student_id: data.studentId,
    });
    queryClient.invalidateQueries({
      queryKey: ['extracurricular-members'],
    });
  };

  // skeleton
  if (isLoading1 || isLoading2) {
    return (
      <>
        <FormContainerSisva>
          <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
          <TextField disabled />
          <FormLabelSisva>Anggota</FormLabelSisva>
          <TextField disabled></TextField>
        </FormContainerSisva>
        <Divider />
        <FormButtonsContainerSisva>
          <Button fullWidth variant="outlined">
            Batal
          </Button>
          <Button fullWidth variant="contained">
            Simpan
          </Button>
        </FormButtonsContainerSisva>
      </>
    );
  }

  return (
    <>
      <FormContainerSisva>
        <FormLabelSisva>Ekstrakurikuler</FormLabelSisva>
        <Controller
          name="extracurricularId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
              {extracurriculars.map((extracurricular) => {
                return (
                  <MenuItem
                    key={extracurricular.id}
                    value={extracurricular.id}
                    sx={{ fontSize: 14 }}
                  >
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
                  <MenuItem
                    key={student.id}
                    value={student.id}
                    sx={{ fontSize: 14 }}
                  >
                    {student.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        ></Controller>
      </FormContainerSisva>
      <Divider />
      <FormButtonsContainerSisva>
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
      </FormButtonsContainerSisva>
    </>
  );
}
