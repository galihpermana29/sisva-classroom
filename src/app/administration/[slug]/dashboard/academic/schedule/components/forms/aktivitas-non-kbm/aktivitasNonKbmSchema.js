import * as yup from "yup";

export const aktiitasNonKbmSchema = yup.object({
  nama: yup.string().required(),
  hari: yup.number().required(),
  jam_mulai: yup.string().required(),
  jam_selesai: yup.string().required(),
});
