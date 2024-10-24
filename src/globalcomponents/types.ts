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
export function getRole(text: RoleText): Role {
  switch (text) {
    case 'Staf':
      return 'staff';
    case 'Guru':
      return 'teacher';
    case 'Manajemen':
      return 'management';
  }
}

export type Gender = 'male' | 'female' | 'others';
export type GenderText = 'Laki-laki' | 'Perempuan' | 'Lainnya';
export function getGender(text: GenderText): Gender {
  switch (text) {
    case 'Laki-laki':
      return 'male';
    case 'Perempuan':
      return 'female';
    case 'Lainnya':
      return 'others';
  }
}

export type Nationality = 'wni' | 'wna';
export type NationalityText = 'Warga Negara Indonesia' | 'Warga Negara Asing';
export function getNationality(text: NationalityText): Nationality {
  switch (text) {
    case 'Warga Negara Indonesia':
      return 'wni';
    case 'Warga Negara Asing':
      return 'wna';
  }
}

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
export function getReligion(text: ReligionText): Religion {
  switch (text) {
    case 'Islam':
      return 'islam';
    case 'Kristen Protestan':
      return 'christian_protestant';
    case 'Kristen Katolik':
      return 'christian_catholic';
    case 'Hindu':
      return 'hindu';
    case 'Buddha':
      return 'buddha';
    case 'Konghucu':
      return 'konghucu';
    case 'Lainnya':
      return 'others';
  }
}
