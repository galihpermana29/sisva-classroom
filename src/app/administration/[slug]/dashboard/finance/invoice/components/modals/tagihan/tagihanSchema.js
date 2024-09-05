import * as yup from "yup";

export const tagihanSchema = yup.object({
  custom_id: yup.string().notRequired(),
  name: yup.string().required("Wajib mengisi nama!"),
  status: yup.string().notRequired(),
  target_user_types: yup
    .array()
    .min(1, "Wajib memilih target!")
    .required("Wajib memilih target!"),
  amount: yup
    .number()
    .min(1, "Wajib mengisi harga!")
    .typeError("Harga harus berupa angka!")
    .required("Wajib mengisi harga!"),
  deadline: yup.string().required("Wajib mengisi batas waktu!"),
  descriptuon: yup.string().notRequired(),
});
