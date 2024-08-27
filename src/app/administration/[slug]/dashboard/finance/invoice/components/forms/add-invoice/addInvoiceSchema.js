import * as yup from "yup";

export const addInvoiceSchema = yup.object({
  amount: yup.number().min(1).required(),
  note: yup.string(),
});
