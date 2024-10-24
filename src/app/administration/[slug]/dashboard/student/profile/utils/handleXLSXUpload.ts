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

const MAX_ROW = 30;

export default function handleXLSXUpload(file: File, afterSuccess: () => void) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const file = e.target.result;
    try {
      const template = XLSX.read(file);
      const sheet = template.Sheets[template.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const rawDataWithoutHeader = rawData.slice(3, MAX_ROW + 3);
      const dataObject = rawDataWithoutHeader
        .map((row) => {
          const role: Role = 'student';
          return {
            name: row[0],
            username: row[1],
            type: role,
            password: row[2],
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
          },
          password: data.password,
        };
        console.log(payload);
        return UsersAPI.createUser(payload);
      });

      await Promise.all(promises);
      afterSuccess();
    } catch (error) {
      console.log(error);
      window.alert('Import Gagal');
    }
  };
  reader.readAsArrayBuffer(file);
}
