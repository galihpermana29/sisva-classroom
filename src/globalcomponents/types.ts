export type Permission =
  | 'manage_school'
  | 'manage_staff'
  | 'manage_academic'
  | 'manage_student'
  | 'report'
  | 'manage_information'
  | 'manage_finance';
export function getPermissions(data: {
  manage_school: boolean;
  manage_staff: boolean;
  manage_academic: boolean;
  manage_student: boolean;
  report: boolean;
  manage_information: boolean;
  manage_finance: boolean;
}): Permission[] {
  const permissions: Permission[] = [];
  if (data.manage_school) permissions.push('manage_school');
  if (data.manage_staff) permissions.push('manage_staff');
  if (data.manage_academic) permissions.push('manage_academic');
  if (data.manage_student) permissions.push('manage_student');
  if (data.report) permissions.push('report');
  if (data.manage_information) permissions.push('manage_information');
  if (data.manage_finance) permissions.push('manage_finance');
  return permissions;
}

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

export type Guardian = 'father' | 'mother' | 'guardian' | 'student';
export type GuardianText = 'Ayah' | 'Ibu' | 'Wali' | 'Murid';
export function getGuardian(text: GuardianText): Guardian {
  switch (text) {
    case 'Ayah':
      return 'father';
    case 'Ibu':
      return 'mother';
    case 'Wali':
      return 'guardian';
    case 'Murid':
      return 'student';
  }
}

export type EducationLevel =
  | 'elementary'
  | 'junior_high'
  | 'senior_high'
  | 'undergraduate'
  | 'graduate'
  | 'doctorate'
  | 'other';
export type EducationLevelText =
  | 'SD'
  | 'SMP'
  | 'SMA/SMK/MA'
  | 'S1/D3/D4'
  | 'S2'
  | 'S3'
  | 'Lainnya';
export function getEducationLevel(text: EducationLevelText): EducationLevel {
  switch (text) {
    case 'SD':
      return 'elementary';
    case 'SMP':
      return 'junior_high';
    case 'SMA/SMK/MA':
      return 'senior_high';
    case 'S1/D3/D4':
      return 'undergraduate';
    case 'S2':
      return 'graduate';
    case 'S3':
      return 'doctorate';
    case 'Lainnya':
      return 'other';
  }
}

export type IncomeLevel = '0-1' | '1-10' | '10-50' | '50-100' | '100+';
export type IncomeLevelText =
  | '0 - Rp1.000.000'
  | 'Rp1.000.000 - Rp10.000.000'
  | 'Rp10.000.000 - Rp50.000.000'
  | 'Rp50.000.000 - Rp100.000.000'
  | 'Rp100.000.000+';
export function getIncomeLevel(text: IncomeLevelText): IncomeLevel {
  switch (text) {
    case '0 - Rp1.000.000':
      return '0-1';
    case 'Rp1.000.000 - Rp10.000.000':
      return '1-10';
    case 'Rp10.000.000 - Rp50.000.000':
      return '10-50';
    case 'Rp50.000.000 - Rp100.000.000':
      return '50-100';
    case 'Rp100.000.000+':
      return '100+';
  }
}

export type LifeStatus = 'alive' | 'dead';
export type LifeStatusText = 'Masih Hidup' | 'Meninggal Dunia';
export function getLifeStatus(text: LifeStatusText): LifeStatus {
  switch (text) {
    case 'Masih Hidup':
      return 'alive';
    case 'Meninggal Dunia':
      return 'dead';
  }
}

export type Relationship =
  | 'parents'
  | 'siblings'
  | 'family'
  | 'friends'
  | 'spouse'
  | 'others';
export type RelationshipText =
  | 'Orang Tua'
  | 'Kakak/Adik'
  | 'Saudara'
  | 'Teman'
  | 'Suami/Istri'
  | 'Lainnya';
export function getRelationship(text: RelationshipText): Relationship {
  switch (text) {
    case 'Orang Tua':
      return 'parents';
    case 'Kakak/Adik':
      return 'siblings';
    case 'Saudara':
      return 'family';
    case 'Teman':
      return 'friends';
    case 'Suami/Istri':
      return 'spouse';
    case 'Lainnya':
      return 'others';
  }
}

export type SubjectType = 'mandatory' | 'optional';
export type SubjectTypeText = 'Wajib' | 'Pilihan';
export function getSubjectType(text: SubjectTypeText): SubjectType {
  switch (text) {
    case 'Wajib':
      return 'mandatory';
    case 'Pilihan':
      return 'optional';
  }
}

export type PeriodStatus = 'active' | 'inactive' | 'finished';
export type PeriodStatusText = 'Aktif' | 'Belum Aktif' | 'Selesai';
export function getPeriodStatus(text: PeriodStatusText): PeriodStatus {
  switch (text) {
    case 'Aktif':
      return 'active';
    case 'Belum Aktif':
      return 'inactive';
    case 'Selesai':
      return 'finished';
  }
}

export type ClassType = 'homeroom' | 'moving';
export type ClassTypeText = 'Kelas Wajib' | 'Kelas Pilihan';
export function getClassType(text: ClassTypeText): ClassType {
  switch (text) {
    case 'Kelas Wajib':
      return 'homeroom';
    case 'Kelas Pilihan':
      return 'moving';
  }
}
