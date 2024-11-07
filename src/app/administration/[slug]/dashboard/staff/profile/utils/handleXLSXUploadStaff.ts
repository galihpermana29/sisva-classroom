import AuthAPI from '@/api/auth';
import UsersAPI from '@/api/users';
import type { User } from '@/globalcomponents/BERespondTypes';
import {
  getGender,
  getNationality,
  getPermissions,
  getReligion,
  getRole,
} from '@/globalcomponents/types';
import * as XLSX from 'xlsx';

/*
# Array structure

- index 0 - 2 is the header
- index 3 - MAX_ROW is the data
- set MAX_ROW to be 1000 max
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

const MAX_ROW = 1000;

function getJsonText(data) {
  return JSON.stringify({
    email: data.email,
    phone: data.phone,
    gender: data.gender,
    nationality: data.nationality,
    personal_id: data.personal_id,
    education_id: data.education_id,
    religion: data.religion,
    address: data.address,
  });
}

function getUserByName(users: User[], name: string) {
  return users.find((user) => user.name === name);
}

function getUserByUsername(users: User[], username: string) {
  return users.find((user) => user.username === username);
}

function getUser(users: User[], user: { name: string; username: string }) {
  if (user.username) return getUserByUsername(users, user.username);
  return getUserByName(users, user.name);
}

export default function handleXLSXUploadStaff(
  file: File,
  onSuccess: (reportText: string[]) => void,
  onError: (reportText: string[]) => void
) {
  const reader = new FileReader();
  const reportText: string[] = [];
  reader.onload = async (e) => {
    const file = e.target.result;
    try {
      const users: User[] = (await UsersAPI.getAllUsers('staff,teacher')).data
        .data;

      const filteredData = users
        .map((user) => {
          const additionalJson = JSON.parse(user.detail.json_text);
          return { ...additionalJson, ...user };
        })
        .filter((user) => user.status == 'active');
      const names = filteredData.map((user) => user.name) as string[];
      const usernames = filteredData.map((user) => user.username) as string[];

      const template = XLSX.read(file);
      const sheet = template.Sheets[template.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const rawDataWithoutHeader = rawData.slice(3, MAX_ROW);
      const dataObject = rawDataWithoutHeader
        .map((row) => {
          const permissions = getPermissions({
            manage_school: row[3],
            manage_staff: row[4],
            manage_academic: row[5],
            manage_student: row[6],
            report: row[7],
            manage_information: row[8],
            manage_finance: row[9],
          });

          return {
            name: row[0],
            username: row[1],
            type: getRole(row[2]),
            permissions: permissions,
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

      const dataUpdate = dataObject.filter(
        (user) => usernames.includes(user.username) || names.includes(user.name)
      );
      const dataCreate = dataObject.filter(
        (user) =>
          !(usernames.includes(user.username) || names.includes(user.name))
      );

      let countCreateUser = 0;
      for (const data of dataCreate) {
        const payload = {
          user: {
            name: data.name,
            type: data.type,
            detail: {
              json_text: getJsonText(data),
            },
            profile_image_uri: data.profile_image_uri,
            roles: [data.type],
            permissions: data.permissions,
          },
          password: data.password,
        };
        await UsersAPI.createUser(payload);
        countCreateUser += 1;
      }
      if (countCreateUser > 0)
        reportText.push(`${countCreateUser} baris user berhasil ditambahkan`);

      const promisesUpdate = dataUpdate.map((data) => {
        const payload = {
          name: data.name,
          type: data.type,
          detail: {
            json_text: getJsonText(data),
          },
          profile_image_uri: data.profile_image_uri,
          roles: [data.type],
          permissions: data.permissions,
        };
        return UsersAPI.updateUserById(
          payload,
          getUser(filteredData, { name: data.name, username: data.username }).id
        );
      });

      const promisesUpdatePassword = dataUpdate.map((data) => {
        const payload = {
          user_id: getUser(filteredData, {
            name: data.name,
            username: data.username,
          }).id,
          new_password: data.password,
        };
        return AuthAPI.resetUserPass(payload);
      });

      const res = await Promise.all([
        ...promisesUpdate,
        ...promisesUpdatePassword,
      ]);

      if (promisesUpdate.length > 0)
        reportText.push(
          `${promisesUpdate.length} baris user berhasil diupdate`
        );
      if (promisesUpdatePassword.length > 0)
        reportText.push(
          `${promisesUpdatePassword.length} baris password berhasil diupdate`
        );
      onSuccess(reportText);
    } catch (error) {
      console.log(error);
      onError(reportText);
    }
  };
  reader.readAsArrayBuffer(file);
}
