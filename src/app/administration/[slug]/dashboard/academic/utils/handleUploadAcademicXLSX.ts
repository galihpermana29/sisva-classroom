import * as XLSX from 'xlsx';
import type {
  KurikulumDanMataPelajaranInputData,
  ProgramStudiInputData,
  ProgramStudiSiswaInputData,
  Sheet,
  TingkatanDanSilabusInputData,
} from './types';

import handleKurikulumDanMataPelajaran from './handleKurikulumDanMataPelajaran';
import handleProgramStudi from './handleProgramStudi';
import handleProgramStudiSiswa from './handleProgramStudiSiswa';
import handleTingkatanDanSilabus from './handleTingkatanDanSilabus';

const MAX_ROW = 1000;

function getSheet(template: XLSX.WorkBook, sheetName: Sheet) {
  return template.Sheets[sheetName];
}

export default function handleUploadAcademicXLSX(file: File) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const file = e.target.result;
    try {
      const template = XLSX.read(file);

      const sheets = [
        getSheet(template, 'Program Studi'), // 0
        getSheet(template, 'Program Studi Siswa'), // 1
        getSheet(template, 'Kurikulum dan Mata Pelajaran'), // 2
        getSheet(template, 'Tingkatan dan Silabus'), // 3
        getSheet(template, 'Periode'), // 4
        getSheet(template, 'Periode dan Kurikulum'), // 5
        getSheet(template, 'Guru'), // 6
        getSheet(template, 'Kelas'), // 7
        getSheet(template, 'Murid'), // 8
        getSheet(template, 'Ekstrakulikuler'), // 9
        getSheet(template, 'Anggota'), // 10
      ];

      // convert to array of array
      const sheetRawData = sheets
        .map((sheet) => {
          return XLSX.utils.sheet_to_json(sheet, { header: 1 });
        })
        // remove header
        .map((data) => {
          return data.slice(3, MAX_ROW);
        })
        // remove empty row
        .map((data) => {
          return data.filter((row) => row[0]);
        });

      await handleProgramStudi(sheetRawData[0] as ProgramStudiInputData);
      await handleProgramStudiSiswa(
        sheetRawData[1] as ProgramStudiSiswaInputData
      );
      await handleKurikulumDanMataPelajaran(
        sheetRawData[2] as KurikulumDanMataPelajaranInputData
      );
      await handleTingkatanDanSilabus(
        sheetRawData[3] as TingkatanDanSilabusInputData
      );
    } catch (error) {
      console.log(error);
      globalThis.alert('Import Gagal');
    }
  };
  reader.readAsArrayBuffer(file);
}
