import FormButtonsContainerSisva from "@/components/FormButtonsContainerSisva";
import FormContainerSisva from "@/components/FormContainerSisva";
import FormLabelSisva from "@/components/FormLabelSisva";
import {
  useAddStudentToStudentGroup,
  useStudentGroups,
} from "@/hooks/useStudentGroups";
import { useStudents } from "@/hooks/useStudents";
import { Button, Divider, MenuItem, Stack, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

type FormEditMember = {
  studentGroupId: string;
  studentId: string;
};

export default function FormAddStudent2({
  onClickCancel,
  onClickSave,
}: {
  onClickCancel: () => void;
  onClickSave: () => void;
}) {
  const queryClient = useQueryClient();
  const { data: students, isLoading: isLoading2 } = useStudents();
  const { data: studentGroups, isLoading: isLoading3 } = useStudentGroups();
  const { mutate: addStudentToStudentGroup } =
    useAddStudentToStudentGroup(queryClient);

  const { handleSubmit, control } = useForm<FormEditMember>({
    defaultValues: {
      studentGroupId: "",
      studentId: "",
    },
  });

  const onSubmit: SubmitHandler<FormEditMember> = async (data) => {
    addStudentToStudentGroup({
      studentGroupId: data.studentGroupId,
      studentId: data.studentId,
    });
  };

  // skeletons
  if (isLoading2 || isLoading3) {
    return <></>;
  }

  return (
    <>
      <FormContainerSisva>
        <FormLabelSisva>Kelas Wajib</FormLabelSisva>
        <Controller
          name="studentGroupId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
              {studentGroups.map((studentGroup) => {
                return (
                  <MenuItem
                    key={studentGroup.id}
                    value={studentGroup.id}
                    sx={{ fontSize: 14 }}
                  >
                    {studentGroup.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        ></Controller>
        <FormLabelSisva>Nama Siswa</FormLabelSisva>
        <Controller
          name="studentId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
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
