import FormButtonsContainerSisva from "@/components/FormButtonsContainerSisva";
import FormContainerSisva from "@/components/FormContainerSisva";
import FormLabelSisva from "@/components/FormLabelSisva";
import { usePeriods } from "@/hooks/usePeriods";
import {
  useAddStudentToStudentGroup,
  useStudentGroups,
  useStudentInStudentGroups,
} from "@/hooks/useStudentGroups";
import { useStudents } from "@/hooks/useStudents";
import { Button, Divider, MenuItem, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

type FormEditMember = {
  periodId: string;
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
  const { data: periods } = usePeriods();
  const { data: students } = useStudents();
  const { data: studentGroups } = useStudentGroups();
  const { data: studentInStudentGroups } = useStudentInStudentGroups();
  const { mutate: addStudentToStudentGroup } =
    useAddStudentToStudentGroup(queryClient);

  const { handleSubmit, control, watch } = useForm<FormEditMember>({
    defaultValues: {
      periodId: "",
      studentGroupId: "",
      studentId: "",
    },
  });

  const selectedPeriodId = watch("periodId");
  const filteredStudentGroups = studentGroups.filter((studentGroup) => {
    if (!selectedPeriodId) return true;
    return studentGroup.period_id === selectedPeriodId;
  });

  const selectedStudentGroupId = watch("studentGroupId");
  const filteredStudents = students.filter(
    (student) =>
      !studentInStudentGroups
        .map((studentInStudentGroup) => studentInStudentGroup.student_id)
        .includes(student.id)
  );

  const onSubmit: SubmitHandler<FormEditMember> = async (data) => {
    addStudentToStudentGroup({
      studentGroupId: data.studentGroupId,
      studentId: data.studentId,
    });
  };

  return (
    <>
      <FormContainerSisva>
        <FormLabelSisva>Periode (opsional)</FormLabelSisva>
        <Controller
          name="periodId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
              {periods.map((period) => {
                return (
                  <MenuItem
                    key={period.id}
                    value={period.id}
                    sx={{ fontSize: 14 }}
                  >
                    {period.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        ></Controller>
        <FormLabelSisva>Kelas Wajib</FormLabelSisva>
        <Controller
          name="studentGroupId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
              {filteredStudentGroups.map((studentGroup) => {
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
          disabled={!selectedStudentGroupId}
          render={({ field }) => (
            <TextField select {...field}>
              {filteredStudents.map((student) => {
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
