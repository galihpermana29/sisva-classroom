import * as yup from "yup";

export const jadwalKelasSchema = yup.object({
  periode: yup.string().required(),
  prodi: yup.string().required(),
  tingkatan: yup.string().required(),
  kelas: yup.string().required(),
  hari: yup.number().required(),
  jam_mulai: yup.string().required(),
  jam_selesai: yup.string().required(),
});
