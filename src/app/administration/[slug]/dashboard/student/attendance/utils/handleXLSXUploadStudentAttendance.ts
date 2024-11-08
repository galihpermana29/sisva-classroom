import AttendanceApi from '@/api/attendance';
import UsersAPI from '@/api/users';
import type { User } from '@/globalcomponents/BERespondTypes';
import type { MonthText } from '@/globalcomponents/types';
import { getAttendance, getMonthNumber } from '@/globalcomponents/types';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
/*
# Array structure

- index 0 - 2 is the header
- index 3 - n is the data
- index in data array hold this information:
  0: name
  1: username
  2: date 1
  3: date 2
  4: date 3
  5: date 4
  6: date 5
  7: date 6
  8: date 7
  9: date 8
  10: date 9
  11: date 10
  12: date 11
  13: date 12
  14: date 13
  15: date 14
  16: date 15
  17: date 16
  18: date 17
  19: date 18
  20: date 19
  21: date 20
  22: date 21
  23: date 22
  24: date 23
  25: date 24
  26: date 25
  27: date 26
  28: date 27
  29: date 28
  30: date 29
  31: date 30
  32: date 31

*/

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

export default function handleXLSXUploadStudentAttendance({
  file,
  onSuccess,
  onError,
  toggleProgressAlert,
  setProgress,
  setProgressLog,
}: {
  file: File;
  onSuccess: (reportText: string[]) => void;
  onError: (reportText: string[]) => void;
  toggleProgressAlert: (isOpen: boolean) => void;
  setProgress: (progress: string) => void;
  setProgressLog: (progressLog: string) => void;
}) {
  const reader = new FileReader();
  const reportText: string[] = [];
  reader.onload = async (e) => {
    const file = e.target.result;
    try {
      const users: User[] = (await UsersAPI.getAllUsers('student')).data.data;

      const activeUsers = users.filter((user) => user.status == 'active');
      const names = activeUsers.map((user) => user.name) as string[];
      const usernames = activeUsers.map((user) => user.username) as string[];

      const template = XLSX.read(file);
      const sheetNames = template.SheetNames.filter((sheetName) => {
        const [monthText, year] = sheetName.trim().split(' ') as [
          MonthText,
          string
        ];
        const months: MonthText[] = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ];
        return (
          months.includes(monthText) &&
          Number(year) >= 2000 &&
          Number(year) <= 2999
        );
      });

      const sheetCount = sheetNames.length;
      let sheetProgress = 1;
      toggleProgressAlert(true);
      for (const sheetName of sheetNames) {
        const [monthText, year] = sheetName.trim().split(' ') as [
          MonthText,
          string
        ];
        const month = getMonthNumber(monthText);

        const sheet = template.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const rawDataWithoutHeader = rawData
          .slice(3)
          .filter((row) => row[0] !== '');

        const dataObject = rawDataWithoutHeader
          .map((row) => {
            return {
              name: row[0],
              username: row[1],
              // prettier-ignore
              attendance: [
              row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9],
              row[10], row[11], row[12], row[13], row[14], row[15], row[16],
              row[17], row[18], row[19], row[20], row[21], row[22], row[23],
              row[24], row[25], row[26], row[27], row[28], row[29], row[30],
              row[31], row[32],
            ].map((attendance) => getAttendance(attendance)),
            };
          })
          .filter(
            (data) =>
              names.includes(data.name) &&
              (!data.username || usernames.includes(data.username))
          );

        let count = 0;
        const rowCount = dataObject.length;
        const maxDay = dayjs(`${year}-${month}-01`).daysInMonth();
        for (const data of dataObject) {
          setProgress(
            `${sheetName} (${sheetProgress}/${sheetCount}): ${count}/${rowCount}`
          );
          for (let i = 0; i < maxDay; i++) {
            const dateCode = dayjs(`${year}-${month}-${i + 1}`).format(
              'YYYYMMDD'
            );
            const status = data.attendance[i];
            const user = getUser(activeUsers, {
              name: data.name,
              username: data.username,
            });
            setProgressLog(`${user.name}: ${i + 1}/${maxDay} - ${status}`);
            await AttendanceApi.createStudentAttendance(user.id, {
              date_id: Number(dateCode),
              status: status,
            });
          }
          count += 1;
        }
        reportText.push(`${sheetName}: ${count} baris berhasil diperbarui`);
        sheetProgress += 1;
      }

      onSuccess(reportText);
      toggleProgressAlert(false);
    } catch (error) {
      console.log(error);
      onError(reportText);
      toggleProgressAlert(false);
    }
  };
  reader.readAsArrayBuffer(file);
}
