export type Permission =
  | 'manage_school'
  | 'manage_staff'
  | 'manage_academic'
  | 'manage_student'
  | 'report'
  | 'manage_information'
  | 'manage_finance';

export type Role = 'staff' | 'teacher' | 'management' | 'student';
export type RoleText = 'Staf' | 'Guru' | 'Manajemen' | 'Siswa';

export type Gender = 'male' | 'female' | 'others';
export type GenderText = 'Laki-laki' | 'Perempuan' | 'Lainnya';

export type Nationality = 'wni' | 'wna';
export type NationalityText = 'Warga Negara Indonesia' | 'Warga Negara Asing';

export type Religion =
  | 'islam'
  | 'christian_protestant'
  | 'christian_catholic'
  | 'hindu'
  | 'buddha'
  | 'konghucu'
  | 'others';
export type ReligionText =
  | 'Islam'
  | 'Kristen Protestan'
  | 'Kristen Katolik'
  | 'Hindu'
  | 'Buddha'
  | 'Konghucu'
  | 'Lainnya';
