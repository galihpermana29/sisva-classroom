import * as XLSX from 'xlsx';
import type {
  AnggotaInputData,
  EkstrakulikulerInputData,
  GuruInputData,
  KelasInputData,
  KurikulumDanMataPelajaranInputData,
  MuridInputData,
  PeriodeDanKurikulumInputData,
  PeriodeInputData,
  ProgramStudiInputData,
  ProgramStudiSiswaInputData,
  Sheet,
  TingkatanDanSilabusInputData,
} from './types';

import handleAnggota from './handleAnggota';
import handleEkstrakulikuler from './handleEkstrakulikuler';
import handleGuru from './handleGuru';
import handleKelas from './handleKelas';
import handleKurikulumDanMataPelajaran from './handleKurikulumDanMataPelajaran';
import handleMurid from './handleMurid';
import handlePeriode from './handlePeriode';
import handlePeriodeDanKurikulum from './handlePeriodeDanKurikulum';
import handleProgramStudi from './handleProgramStudi';
import handleProgramStudiSiswa from './handleProgramStudiSiswa';
import handleTingkatanDanSilabus from './handleTingkatanDanSilabus';

const MAX_ROW = 1000;

function getSheet(template: XLSX.WorkBook, sheetName: Sheet) {
  return template.Sheets[sheetName];
}

const importReport = {
  programStudi: '',
  programStudiSiswa: '',
  kurikulumDanMataPelajaran: '',
  tingkatanDanSilabus: '',
  periode: '',
  periodeDanKurikulum: '',
  guru: '',
  kelas: '',
  murid: '',
  ekstrakulikuler: '',
  anggota: '',
};

export type ImportReport = typeof importReport;

// prettier-ignore
export default function handleXLSXUploadAcademic(file: File, onSuccess: (importReport: ImportReport ) => void, onError: (importReport: ImportReport) => void) {

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

      importReport.programStudi = await handleProgramStudi(sheetRawData[0] as ProgramStudiInputData);
      importReport.programStudiSiswa = await handleProgramStudiSiswa(sheetRawData[1] as ProgramStudiSiswaInputData);
      importReport.kurikulumDanMataPelajaran = await handleKurikulumDanMataPelajaran(sheetRawData[2] as KurikulumDanMataPelajaranInputData);
      importReport.tingkatanDanSilabus = await handleTingkatanDanSilabus(sheetRawData[3] as TingkatanDanSilabusInputData);
      importReport.periode = await handlePeriode(sheetRawData[4] as PeriodeInputData);
      importReport.periodeDanKurikulum = await handlePeriodeDanKurikulum(sheetRawData[5] as PeriodeDanKurikulumInputData);
      importReport.guru = await handleGuru(sheetRawData[6] as GuruInputData);
      importReport.kelas = await handleKelas(sheetRawData[7] as KelasInputData);
      importReport.murid = await handleMurid(sheetRawData[8] as MuridInputData);
      importReport.ekstrakulikuler = await handleEkstrakulikuler(sheetRawData[9] as EkstrakulikulerInputData);
      importReport.anggota = await handleAnggota(sheetRawData[10] as AnggotaInputData);

      onSuccess(importReport);

    } catch (error) {
      console.log(error);
      
      onError(importReport);
    }
  };
  reader.readAsArrayBuffer(file);
}
