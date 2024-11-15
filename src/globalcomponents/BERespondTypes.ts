type Grade =
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
    grade: Grade; //* actually could be any string
  };
  profile_image_uri: string;
  roles: string[]; //? ???
  permissions: string[]; //? ???
  status: string; //? active, inactive ???
};

export type Extracurricular = {
  id: string;
  name: string;
  teacher_id: string;
  teacher_name: string;
};

export type ExtracurricularMember = {
  extracurricular_id: string;
  extracurricular_name: string;
  student_id: string;
  student_name: string;
};

export type SubjectTeacher = {
  teacher_id: string;
  teacher_name: string;
  subject_id: string;
  subject_name: string;
  grade: Grade;
  subject_detail: {
    id: string;
    name: string;
    type: string; //? mandatory etc ???
    study_program_id: string;
    study_program_name: string;
    curriculum_id: string;
    curriculum_name: string;
  };
};

export type StudentGroup = {
  id: string;
  name: string;
  type: string; //? homeroom, elective ???
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
