import UsersAPI from '@/api/users';
import type { Permission, Role } from '@/globalcomponents/types';
import * as XLSX from 'xlsx';

/*
# Array structure

- index 0 - 2 is the header
- index 3 - MAX_ROW is the data
- set MAX_ROW to be 30 max
- index in data array hold this information:
  0: name
  1: username
  2: type
  3: permissions "Sekolah"
  4: permissions "Karyawan"
  5: permissions "Akademik"
  6: permissions "Siswa"
  7: permissions "Rapot"
  8: permissions "Informasi"
  9: permissions "Keuangan"
  10: password

*/

const MAX_ROW = 30;

export default function handleXLSXUpload(file: File) {
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const file = e.target.result;
      const template = XLSX.read(file);
      const sheet = template.Sheets[template.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const rawDataWithoutHeader = rawData.slice(3, MAX_ROW + 3);

      const dataObject = rawDataWithoutHeader
        .map((row) => {
          function getPermissions() {
            const permissions: Permission[] = [];
            if (row[3]) permissions.push('manage_school');
            if (row[4]) permissions.push('manage_staff');
            if (row[5]) permissions.push('manage_academic');
            if (row[6]) permissions.push('manage_student');
            if (row[7]) permissions.push('report');
            if (row[8]) permissions.push('manage_information');
            if (row[9]) permissions.push('manage_finance');
            return permissions;
          }

          function getRole(): Role {
            switch (row[2]) {
              case 'Staf':
                return 'staff';
              case 'Guru':
                return 'teacher';
              case 'Manajemen':
                return 'management';
            }
          }

          return {
            name: row[0],
            username: row[1],
            type: getRole(),
            permissions: getPermissions(),
            password: row[10],
          };
        })
        .filter((data) => data.name);

      const promises = dataObject.map((data) => {
        const payload = {
          user: {
            name: data.name,
            type: data.type,
            detail: {
              json_text: JSON.stringify({
                username: data.username,
              }),
            },
            profile_image_uri: '',
            roles: [data.type],
            permissions: data.permissions,
          },
          password: data.password,
        };
        console.log(payload);
        return UsersAPI.createUser(payload);
      });

      const result = await Promise.all(promises);
      console.log(result);
    };
    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.log(error);
  }
}
