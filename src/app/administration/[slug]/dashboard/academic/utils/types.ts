import type {
  ClassType,
  PeriodStatus,
  SubjectType,
} from "@/globalcomponents/types";

// Sheets structure
export type Sheet =
  | "Program Studi"
  | "Program Studi Siswa"
  | "Kurikulum dan Mata Pelajaran"
  | "Tingkatan dan Silabus"
  | "Periode"
  | "Periode dan Kurikulum"
  | "Guru"
  | "Kelas"
  | "Murid"
  | "Ekstrakulikuler"
  | "Anggota";

export type Grade =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "VIII"
  | "IX"
  | "X"
  | "XI"
  | "XII";

export type ProgramStudiInputData = [
  string, // 0 - name
  string, // 1 - code
  boolean, // 2 - tingkatan I
  boolean, // 3 - tingkatan II
  boolean, // 4 - tingkatan III
  boolean, // 5 - tingkatan IV
  boolean, // 6 - tingkatan V
  boolean, // 7 - tingkatan VI
  boolean, // 8 - tingkatan VII
  boolean, // 9 - tingkatan VIII
  boolean, // 10 - tingkatan IX
  boolean, // 11 - tingkatan X
  boolean, // 12 - tingkatan XI
  boolean, // 13 - tingkatan XII
][];

export type ProgramStudiStatus = "active" | "inactive";

export type ProgramStudi = {
  id: string;
  name: string;
  code: string;
  grades: Grade[];
  status: ProgramStudiStatus;
};

export type ProgramStudiSiswaInputData = [
  string, // 0 - name
  string, // 1 - username (opsional)
  string, // 2 - Nama Program Studi
  Grade, // 3 - Tingkatan
][];

export type User = {
  id: string;
  username: string;
  nik: string;
  name: string;
  type: string; // student, teacher, staff ???
  detail: {
    json_text: string;
    grade: Grade;
  };
  profile_image_uri: string;
  roles: string[]; // ???
  permissions: string[]; // ???
  status: string; // active, inactive ???
};

export type KurikulumDanMataPelajaranInputData = [
  string, // 0 - nama kurikulum
  string, // 1 - nama program studi
  string, // 2 - nama mata pelajaran
  SubjectType, // 3 - type mata pelajaran
][];

export type Curriculum = {
  id: string;
  name: string;
  description: string;
  study_programs:
    | {
        id: string;
        code: string;
      }[]
    | null;
  total_subjects: number;
};

export type Subject = {
  id: string;
  name: string;
  type: SubjectType;
  study_program_id: string;
  study_program_name: string;
  curriculum_id: string;
  curriculum_name: string;
};

export type TingkatanDanSilabusInputData = [
  string, // 0 - nama mata pelajaran
  Grade, // 1 - tingkatan
  string, // 2 - uri silabus
][];

export type Syllabus = {
  id: string;
  file_uri: string;
  study_program_id: string;
  study_program_name: string;
  curriculum_id: string;
  curriculum_name: string;
  subject_id: string;
  subject_name: string;
  grade: Grade;
};

export type PeriodeInputData = [
  string, // 0 - nama periode
  number, // 1 - tanggal mulai, Excel serial date format
  number, // 2 - tanggal selesai, Excel serial date format
][];

export type Period = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: PeriodStatus;
  study_programs:
    | {
        id: string;
        code: string;
      }[]
    | null;
};

export type PeriodeDanKurikulumInputData = [
  string, // 0 - nama periode
  string, // 1 - nama kurikulum
  string, // 2 - nama program studi
  Grade, // 3 - tingkatan
][];

export type PeriodCurriculum = {
  period_id: string;
  period_name: string;
  study_program_id: string;
  study_program_name: string;
  grade: Grade;
  curriculum_id: string;
  curriculum_name: string;
};

export type GuruInputData = [
  string, // 0 - nama guru
  string, // 1 - username (opsional)
  string, // 2 - nama program studi
  Grade, // 3 - tingkatan
][];

export type SubjectTeacher = {
  teacher_id: string;
  teacher_name: string;
  subject_id: string;
  subject_name: string;
  grade: Grade;
  subject_detail: {
    id: string;
    name: string;
    type: SubjectType;
    study_program_id: string;
    study_program_name: string;
    curriculum_id: string;
    curriculum_name: string;
  };
};

export type KelasInputData = [
  string, // 0 - nama kelas
  string, // 1 - nama wali kelas
  string, // 2 - username wali kelas
  string, // 3 - nama periode
  string, // 4 - nama program studi
  Grade, // 5 - tingkatan
][];

export type StudentGroup = {
  id: string;
  name: string;
  type: ClassType;
  period_id: string;
  period_name: string;
  study_program_id: string;
  study_program_name: string;
  grade: Grade;
  detail: {
    homeroom_teacher_id: string;
    homeroom_teacher_name: string;
  };
};

export type MuridInputData = [
  string, // 0 - nama kelas
  string, // 1 - nama siswa
  string, // 2 - username siswa
][];

export type StudentGroupStudent = {
  student_group_id: string;
  student_group_name: string;
  student_id: string;
  student_name: string;
};

export type EkstrakulikulerInputData = [
  string, // 0 - nama ekstrakulikuler
  string, // 1 - nama pembina
  string, // 2 - username pembina
][];

export type Ekstrakulikuler = {
  id: string;
  name: string;
  teacher_id: string;
  teacher_name: string;
};

export type AnggotaInputData = [
  string, // 0 - nama ekstrakulikuler
  string, // 1 - nama anggota
  string, // 2 - username anggota
][];

export type EkstrakulikulerStudent = {
  extracurricular_id: string;
  extracurricular_name: string;
  student_id: string;
  student_name: string;
};
