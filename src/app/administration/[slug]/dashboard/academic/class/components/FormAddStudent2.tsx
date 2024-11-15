import FormButtonsContainerSisva from "@/components/FormButtonsContainerSisva";
import FormContainerSisva from "@/components/FormContainerSisva";
import FormLabelSisva from "@/components/FormLabelSisva";
import { usePeriods } from "@/hooks/usePeriods";
import {
  useAddStudentToStudentGroup,
  useStudentGroups,
  useStudentInStudentGroups,
  useUpdateStudentInStudentGroup,
} from "@/hooks/useStudentGroups";
import { useStudents } from "@/hooks/useStudents";
import { useStudyPrograms } from "@/hooks/useStudyPrograms";
import { Button, Divider, MenuItem, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

type FormStudentInStudentGroup = {
  periodId: string;
  studyProgramId: string;
  studentGroupId: string;
  studentId: string;
};

export default function FormAddStudent2({
  studentId,
  studentGroupId,
  onClickCancel,
  onClickSave,
}: {
  studentId?: string;
  studentGroupId?: string;
  onClickCancel: () => void;
  onClickSave: () => void;
}) {
  const queryClient = useQueryClient();
  const { data: periods } = usePeriods();
  const { data: students } = useStudents();
  const { data: studyPrograms } = useStudyPrograms();
  const { data: studentGroups } = useStudentGroups();
  const { data: studentInStudentGroups } = useStudentInStudentGroups();
  const { mutate: addStudentToStudentGroup } =
    useAddStudentToStudentGroup(queryClient);
  const { mutate: updateStudentInStudentGroup } =
    useUpdateStudentInStudentGroup(queryClient);

  const { handleSubmit, control, watch } = useForm<FormStudentInStudentGroup>({
    defaultValues: {
      periodId: "",
      studyProgramId: "",
      studentGroupId: studentGroupId || "",
      studentId: studentId || "",
    },
  });

  const selectedPeriodId = watch("periodId");
  const selectedStudyProgramId = watch("studyProgramId");
  const filteredStudentGroups = studentGroups
    .filter((studentGroup) => {
      if (!selectedPeriodId) return true;
      return studentGroup.period_id === selectedPeriodId;
    })
    .filter((studentGroup) => {
      if (!selectedStudyProgramId) return true;
      return studentGroup.study_program_id === selectedStudyProgramId;
    });

  const selectedStudentGroupId = watch("studentGroupId");
  const filteredStudents = students.filter((student) => {
    if (studentId) return student.id === studentId;
    return !studentInStudentGroups
      .map((studentInStudentGroup) => studentInStudentGroup.student_id)
      .includes(student.id);
  });

  const onSubmit: SubmitHandler<FormStudentInStudentGroup> = async (data) => {
    if (studentId) {
      updateStudentInStudentGroup({
        oldStudentGroupId: studentGroupId,
        newStudentGroupId: data.studentGroupId,
        oldStudentId: studentId,
        studentId: data.studentId,
      });
    } else {
      addStudentToStudentGroup({
        studentGroupId: data.studentGroupId,
        studentId: data.studentId,
      });
    }
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
        <FormLabelSisva>Program Studi (opsional)</FormLabelSisva>
        <Controller
          name="studyProgramId"
          control={control}
          render={({ field }) => (
            <TextField select {...field}>
              {studyPrograms.map((studyProgram) => {
                return (
                  <MenuItem
                    key={studyProgram.id}
                    value={studyProgram.id}
                    sx={{ fontSize: 14 }}
                  >
                    {studyProgram.code}
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
            <TextField
              select
              inputProps={{
                readOnly: !!studentId,
              }}
              {...field}
            >
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
