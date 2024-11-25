import type { Day, PeriodStatus, StudyProgramStatus } from "./types";

type Grade =
  //* actually could be any string
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

export type User = {
  id: string;
  username: string;
  nik: string;
  name: string;
  type: string; //? student, teacher, staff ???
  detail: {
    json_text: string;
    grade: Grade;
  };
  profile_image_uri: string;
  roles: string[]; //? ???
  permissions: string[]; //? ???
  status: string; //? active, inactive ???
};

export type Extracurricular = {
  id: number;
  name: string;
  teacher_id: string;
  teacher_name: string;
};

export type ExtracurricularMember = {
  extracurricular_id: number;
  extracurricular_name: string;
  student_id: string;
  student_name: string;
};

export type SubjectTeacher = {
  teacher_id: string;
  teacher_name: string;
  subject_id: number;
  subject_name: string;
  grade: Grade;
  subject_detail: {
    id: number;
    name: string;
    type: string; //? mandatory etc ???
    study_program_id: number;
    study_program_name: string;
    curriculum_id: number;
    curriculum_name: string;
  };
};

export type StudentGroup = {
  id: number;
  name: string;
  type: string; //? homeroom, elective ???
  period_id: number;
  period_name: string;
  study_program_id: number;
  study_program_name: string;
  grade: Grade;
  detail: {
    homeroom_teacher_id: string;
    homeroom_teacher_name: string;
  };
};

export type StudentInStudentGroup = {
  student_id: string;
  student_name: string;
  student_group_id: number;
  student_group_name: string;
};

export type Period = {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  status: PeriodStatus;
  study_programs: {
    id: number;
    code: string;
  };
};

export type StudyProgram = {
  id: number;
  name: string;
  code: string;
  status: StudyProgramStatus;
  grades: Grade[];
};

export type ClassSchedule = {
  id: number;
  class_id: number;
  class_name: string;
  school_schedule_id: number;
  study_program_id: number;
  teacher_id: string;
  teacher_name: string;
  subject_id: number;
  subject_name: string;
  grade: Grade;
  day: Day;
  start_time: string;
  end_time: string;
};

export type NonLearningSchedules = {
  id: number;
  name: string;
  school_schedule_id: number;
  study_program_id: number;
  grade: Grade;
  day: Day;
  start_time: string;
  end_time: string;
};

export type Class = {
  id: number;
  name: string;
  student_group_id: number;
  student_group_name: string;
  subject_id: number;
  subject_name: string;
  teacher_id: string;
  teacher_name: string;
};

export type SchoolSchedules = {
  id: number;
  period_id: number;
  study_program_id: number;
  grade: Grade;
  status: string; // ? active, inactive ???
  day: Day;
  start_time: string;
  end_time: string;
};

export type Invoice = {
  id: number;
  user_bill_id: number;
  status: string; // ? pending, ... ???
  amount: number;
  note: string;
  payment_proof: {
    invoice_id: number;
    uri: string;
    note: string;
    update_by: string;
    update_time: string;
  };
};
