import * as yup from "yup";

export const getEditInvoiceSchema = ({ invoice }) =>
  yup.object({
    status: yup.string().required().default(invoice?.status),
    note: yup.string().default(invoice?.note),
    payment_proof_uri: yup.string().default(invoice?.payment_proof?.uri),
    payment_proof_note: yup.string().default(invoice?.payment_proof?.note),
  });
