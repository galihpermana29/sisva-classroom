type Grade =
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

export type User = {
  id: string;
  username: string;
  nik: string;
  name: string;
  type: string; // student, teacher, staff ???
  detail: {
    json_text: string;
    grade: Grade; // actually could be any string
  };
  profile_image_uri: string;
  roles: string[]; // ???
  permissions: string[]; // ???
  status: string; // active, inactive ???
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
