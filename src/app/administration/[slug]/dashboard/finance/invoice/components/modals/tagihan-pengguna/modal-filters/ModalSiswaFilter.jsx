import { Button, Stack, Typography, useTheme } from "@mui/material";
import { ModalSelect } from "./ModalSelect";
import { useGetAllPeriods } from "@/hooks/useGetAllPeriods";
import { useGetAllStudyPrograms } from "@/hooks/useGetAllStudyPrograms";
import { useGetAllStudentGroups } from "@/hooks/useGetAllStudentGroups";
import ResetIcon from "../../../icons/ResetIcon";

export const ModalSiswaFilter = ({ filters, setFilters }) => {
  const { data: periods } = useGetAllPeriods();
  const { data: studyPrograms } = useGetAllStudyPrograms();
  const { data: studentGroups } = useGetAllStudentGroups();

  const periodFilter = filters?.period ?? "";
  const studyProgramFilter = filters?.studyProgram ?? "";
  const gradeFilter = filters?.grade ?? "";
  const classFilter = filters?.kelas ?? "";

  const periodeSelectData = mapPeriode(periods);
  const studyProgramSelectData = filterAndMapProdi(
    periodFilter,
    periods,
    studyPrograms
  );
  const gradeSelectData = filterAndMapGrades(studyPrograms, studyProgramFilter);
  const classSelectData = filterAndMapClass(
    periodFilter,
    studyProgramFilter,
    gradeFilter,
    studentGroups
  );

  const onPeriodeChange = (event) =>
    setFilters({
      period: Number(event.target.value),
      studyProgram: "",
      grade: "",
      kelas: "",
    });
  const onProdiChange = (event) =>
    setFilters((prev) => ({
      ...prev,
      studyProgram: Number(event.target.value),
      grade: "",
      kelas: "",
    }));
  const onGradeChange = (event) =>
    setFilters((prev) => ({
      ...prev,
      grade: event.target.value,
      kelas: "",
    }));
  const onClassChange = (event) =>
    setFilters((prev) => ({ ...prev, kelas: Number(event.target.value) }));

  const initialFilter = { period: "", studyProgram: "", grade: "", kelas: "" };
  const onReset = () => setFilters(initialFilter);
  const theme = useTheme();

  return (
    <Stack
      width={{ xs: "100%", md: "max-content" }}
      justifyContent="end"
      sx={{ overflowX: "auto" }}
    >
      <Stack
        width={{ xs: "100%", md: "max-content" }}
        flexDirection="row"
        gap={0.5}
        alignItems="center"
        justifyContent={{ md: "end", xs: "space-evenly" }}
      >
        <ModalSelect
          name="Periode"
          data={periodeSelectData}
          value={periodFilter}
          handleChange={onPeriodeChange}
        />
        <ModalSelect
          name="Prodi"
          data={studyProgramSelectData}
          handleChange={onProdiChange}
          value={studyProgramFilter}
        />
        <ModalSelect
          name="Tingkat"
          data={gradeSelectData}
          disabled={studyProgramFilter === ""}
          handleChange={onGradeChange}
          value={gradeFilter}
        />
        <ModalSelect
          name="Kelas"
          data={classSelectData}
          disabled={gradeFilter === ""}
          handleChange={onClassChange}
          value={classFilter}
        />
        <Button
          className="min-w-max px-3"
          startIcon={<ResetIcon color={theme.palette.primary.main} />}
          onClick={onReset}
        >
          <Typography
            fontWeight={"600"}
            fontSize={"13px"}
            color={"primary.main"}
          >
            Reset
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

const mapPeriode = (periods) => {
  if (!periods) return [];
  return periods.map((period) => ({ label: period.name, value: period.id }));
};

const filterAndMapProdi = (periodFilter, periods, studyPrograms) => {
  if (!periods) return [];
  if (!studyPrograms) return [];
  if (!periodFilter) {
    return studyPrograms
      .filter((studyProgram) => studyProgram.status === "active")
      .map((studyProgram) => ({
        label: studyProgram.code,
        value: studyProgram.id,
      }));
  }

  return periods
    .filter((period) => period.id === Number(periodFilter))
    .flatMap((period) =>
      period.study_programs.map((studyProgram) => ({
        label: studyProgram.code,
        value: studyProgram.id,
      }))
    );
};

const filterAndMapGrades = (studyPrograms, studyProgramFilter) => {
  if (!studyProgramFilter) return [];
  if (!studyPrograms) return [];
  return studyPrograms
    .filter((studyProgram) => studyProgram.id === studyProgramFilter)
    .flatMap((studyProgram) =>
      studyProgram.grades?.map((grade) => ({ label: grade, value: grade }))
    );
};

const filterAndMapClass = (
  periodFilter,
  studyProgramFilter,
  gradeFilter,
  studentGroups
) => {
  if (!gradeFilter) return [];
  if (!studentGroups) return [];
  return studentGroups
    .filter(
      (group) =>
        group.period_id === periodFilter &&
        group.study_program_id === studyProgramFilter &&
        group.grade === gradeFilter
    )
    .map((group) => ({ label: group.name, value: group.id }));
};
