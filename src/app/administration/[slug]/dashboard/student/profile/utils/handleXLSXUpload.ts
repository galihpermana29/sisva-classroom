import AuthAPI from '@/api/auth';
import UsersAPI from '@/api/users';
import type { Role } from '@/globalcomponents/types';
import {
  getEducationLevel,
  getGender,
  getGuardian,
  getIncomeLevel,
  getLifeStatus,
  getNationality,
  getRelationship,
  getReligion,
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
  2: password
  3: email
  4: phone
  5: gender
  6: nationality
  7: personal_id
  8: education_id
  9: religion
  10: address
  11: profile_image_uri
  12: guardian_type

  13: father_name
  14: father_email
  15: father_phone
  16: father_occupation
  17: father_education
  18: father_income
  19: father_birth_year
  20: father_life_status
  21: father_religion
  22: father_address

  23: mother_name
  24: mother_email
  25: mother_phone
  26: mother_occupation
  27: mother_education
  28: mother_income
  29: mother_birth_year
  30: mother_life_status
  31: mother_religion
  32: mother_address

  33: guardian_name
  34: guardian_gender
  35: guardian_relationship
  36: guardian_email
  37: guardian_phone
  38: guardian_occupation
  39: guardian_education
  40: guardian_income
  41: guardian_birth_year
  42: guardian_life_status
  43: guardian_religion
  44: guardian_address

*/

const MAX_ROW = 1000;

function getJsonText(data) {
  return JSON.stringify({
    username: data.username,
    email: data.email,
    phone: data.phone,
    gender: data.gender,
    nationality: data.nationality,
    address: data.address,
    religion: data.religion,
    education_id: data.education_id,
    personal_id: data.personal_id,
    guardian_type: data.guardian_type,
    //
    father_name: data.father_name,
    father_email: data.father_email,
    father_phone: data.father_phone,
    father_occupation: data.father_occupation,
    father_education: data.father_education,
    father_income: data.father_income,
    father_birth_year: data.father_birth_year,
    father_life_status: data.father_life_status,
    father_religion: data.father_religion,
    father_address: data.father_address,
    //
    mother_name: data.mother_name,
    mother_email: data.mother_email,
    mother_phone: data.mother_phone,
    mother_occupation: data.mother_occupation,
    mother_education: data.mother_education,
    mother_income: data.mother_income,
    mother_birth_year: data.mother_birth_year,
    mother_life_status: data.mother_life_status,
    mother_religion: data.mother_religion,
    mother_address: data.mother_address,
    //
    guardian_name: data.guardian_name,
    guardian_gender: data.guardian_gender,
    guardian_relationship: data.guardian_relationship,
    guardian_email: data.guardian_email,
    guardian_phone: data.guardian_phone,
    guardian_occupation: data.guardian_occupation,
    guardian_education: data.guardian_education,
    guardian_income: data.guardian_income,
    guardian_birth_year: data.guardian_birth_year,
    guardian_life_status: data.guardian_life_status,
    guardian_religion: data.guardian_religion,
    guardian_address: data.guardian_address,
  });
}

function getUserId(users, username: string) {
  return users.find((user) => user.username == username).id;
}

export default function handleXLSXUpload(file: File, afterSuccess: () => void) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const file = e.target.result;
    try {
      const {
        data: { data },
      } = await UsersAPI.getAllUsers('student');

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
      const rawDataWithoutHeader = rawData.slice(3, MAX_ROW);
      const dataObject = rawDataWithoutHeader
        .map((row) => {
          const role: Role = 'student';
          return {
            name: row[0],
            username: row[1],
            type: role,
            password: row[2],
            email: row[3],
            phone: row[4],
            gender: getGender(row[5]),
            nationality: getNationality(row[6]),
            personal_id: row[7],
            education_id: row[8],
            religion: getReligion(row[9]),
            address: row[10],
            profile_image_uri: row[11],
            guardian_type: getGuardian(row[12]),
            //
            father_name: row[13],
            father_email: row[14],
            father_phone: row[15],
            father_occupation: row[16],
            father_education: getEducationLevel(row[17]),
            father_income: getIncomeLevel(row[18]),
            father_birth_year: row[19],
            father_life_status: getLifeStatus(row[20]),
            father_religion: getReligion(row[21]),
            father_address: row[22],
            //
            mother_name: row[23],
            mother_email: row[24],
            mother_phone: row[25],
            mother_occupation: row[26],
            mother_education: getEducationLevel(row[27]),
            mother_income: getIncomeLevel(row[28]),
            mother_birth_year: row[29],
            mother_life_status: getLifeStatus(row[30]),
            mother_religion: getReligion(row[31]),
            mother_address: row[32],
            //
            guardian_name: row[33],
            guardian_gender: getGender(row[34]),
            guardian_relationship: getRelationship(row[35]),
            guardian_email: row[36],
            guardian_phone: row[37],
            guardian_occupation: row[38],
            guardian_education: getEducationLevel(row[39]),
            guardian_income: getIncomeLevel(row[40]),
            guardian_birth_year: row[41],
            guardian_life_status: getLifeStatus(row[42]),
            guardian_religion: getReligion(row[43]),
            guardian_address: row[44],
          };
        })
        .filter((data) => data.name);

      const dataUpdate = dataObject.filter((user) =>
        usernames.includes(user.username)
      );
      const dataCreate = dataObject.filter((user) => !user.username);

      dataCreate.forEach(async (data) => {
        const payload = {
          user: {
            name: data.name,
            type: data.type,
            detail: {
              json_text: getJsonText(data),
            },
            profile_image_uri: data.profile_image_uri,
            roles: [data.type],
          },
          password: data.password,
        };
        await UsersAPI.createUser(payload);
      });

      const promisesUpdate = dataUpdate.map((data) => {
        const payload = {
          name: data.name,
          type: data.type,
          detail: {
            json_text: getJsonText(data),
          },
          profile_image_uri: data.profile_image_uri,
          roles: [data.type],
        };
        return UsersAPI.updateUserById(
          payload,
          getUserId(filteredData, data.username)
        );
      });

      const promisesUpdatePassword = dataUpdate.map((data) => {
        const payload = {
          user_id: getUserId(filteredData, data.username),
          new_password: data.password,
        };
        return AuthAPI.resetUserPass(payload);
      });

      const res = await Promise.all([
        ...promisesUpdate,
        ...promisesUpdatePassword,
      ]);
      afterSuccess();
    } catch (error) {
      console.log(error);
      globalThis.alert('Import Gagal');
    }
  };
  reader.readAsArrayBuffer(file);
}
