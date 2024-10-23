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
