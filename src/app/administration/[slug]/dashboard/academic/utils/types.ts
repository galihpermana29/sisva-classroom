import type { SubjectType } from '@/globalcomponents/types';

// Sheets structure
export type Sheet =
  | 'Program Studi'
  | 'Program Studi Siswa'
  | 'Kurikulum dan Mata Pelajaran'
  | 'Tingkatan dan Silabus'
  | 'Periode'
  | 'Periode dan Kurikulum'
  | 'Guru'
  | 'Kelas'
  | 'Murid'
  | 'Ekstrakulikuler'
  | 'Anggota';

export type Grade =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII'
  | 'IX'
  | 'X'
  | 'XI'
  | 'XII';

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
  boolean // 13 - tingkatan XII
][];

export type ProgramStudiStatus = 'active' | 'inactive';

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
  Grade // 3 - Tingkatan
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
  SubjectType // 3 - type mata pelajaran
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
  string // 2 - uri silabus
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
