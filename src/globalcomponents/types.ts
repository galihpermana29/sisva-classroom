export type Permission =
  | 'manage_school'
  | 'manage_staff'
  | 'manage_academic'
  | 'manage_student'
  | 'report'
  | 'manage_information'
  | 'manage_finance';

export type Role = 'staff' | 'teacher' | 'management' | 'student';

export type Gender = 'male' | 'female' | 'others';

export type Nationality = 'wni' | 'wna';

export type Religion =
  | 'islam'
  | 'christian_protestant'
  | 'christian_catholic'
  | 'hindu'
  | 'buddha'
  | 'konghucu'
  | 'others';
