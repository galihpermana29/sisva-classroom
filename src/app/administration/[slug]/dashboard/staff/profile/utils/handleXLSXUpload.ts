import AuthAPI from '@/api/auth';
import UsersAPI from '@/api/users';
import type { Permission } from '@/globalcomponents/types';
import {
  getGender,
  getNationality,
  getReligion,
  getRole,
} from '@/globalcomponents/types';
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
  11: email
  12: phone
  13: gender
  14: nationality
  15: personal_id
  16: education_id
  17: religion
  18: address
  19: profile_image_uri

*/

const MAX_ROW = 30;

export default function handleXLSXUpload(file: File, afterSuccess: () => void) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const file = e.target.result;
    try {
      const {
        data: { data },
      } = await UsersAPI.getAllUsers('staff,teacher');

      const filteredData = data
        .map((user) => {
          const additionalJson = JSON.parse(user.detail.json_text);
          delete additionalJson.username;
          return { ...user, ...additionalJson };
        })
        .filter((user) => user.status == 'active');
      const usernames = filteredData.map((user) => user.username) as string[];

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

          return {
            name: row[0],
            username: row[1],
            type: getRole(row[2]),
            permissions: getPermissions(),
            password: row[10],
            email: row[11],
            phone: row[12],
            gender: getGender(row[13]),
            nationality: getNationality(row[14]),
            personal_id: row[15],
            education_id: row[16],
            religion: getReligion(row[17]),
            address: row[18],
            profile_image_uri: row[19],
          };
        })
        .filter((data) => data.name);

      const dataUpdate = dataObject.filter((user) =>
        usernames.includes(user.username)
      );
      const dataCreate = dataObject.filter((user) => !user.username);

      const promisesCreate = dataCreate.map((data) => {
        const payload = {
          user: {
            name: data.name,
            type: data.type,
            detail: {
              json_text: JSON.stringify({
                username: data.username,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                nationality: data.nationality,
                personal_id: data.personal_id,
                education_id: data.education_id,
                religion: data.religion,
                address: data.address,
              }),
            },
            profile_image_uri: data.profile_image_uri,
            roles: [data.type],
            permissions: data.permissions,
          },
          password: data.password,
        };
        return UsersAPI.createUser(payload);
      });

      const promisesUpdate = dataUpdate.map((data) => {
        const user_id = filteredData.find(
          (user) => user.username == data.username
        ).id;
        const payload = {
          name: data.name,
          type: data.type,
          detail: {
            json_text: JSON.stringify({
              username: data.username,
              email: data.email,
              phone: data.phone,
              gender: data.gender,
              nationality: data.nationality,
              personal_id: data.personal_id,
              education_id: data.education_id,
              religion: data.religion,
              address: data.address,
            }),
          },
          profile_image_uri: data.profile_image_uri,
          roles: [data.type],
          permissions: data.permissions,
        };
        return UsersAPI.updateUserById(payload, user_id);
      });

      const promisesUpdatePassword = dataUpdate.map((data) => {
        const user_id = filteredData.find(
          (user) => user.username == data.username
        ).id;
        const payload = {
          user_id: user_id,
          new_password: data.password,
        };
        console.log(payload);
        return AuthAPI.resetUserPass(payload);
      });

      const res = await Promise.all([
        ...promisesCreate,
        ...promisesUpdate,
        ...promisesUpdatePassword,
      ]);
      afterSuccess();
    } catch (error) {
      console.log(error);
      window.alert('Import Bermasalah');
    }
  };
  reader.readAsArrayBuffer(file);
}
