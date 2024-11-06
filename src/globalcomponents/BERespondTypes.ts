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
