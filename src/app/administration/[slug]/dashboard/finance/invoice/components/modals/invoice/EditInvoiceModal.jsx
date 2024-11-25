"use client";

import { ModeEdit } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import { ModalBody } from "@/components/CustomModal";
import { FieldLabel } from "@/components/FieldLabel";
import { useGetUserById } from "@/hooks/query/user/useGetUserById";
import { formatToRupiah } from "@/utils/formatToRupiah";

import { useEditInvoice } from "../../../hooks/useEditInvoice";
import { useGetAllUserBill } from "../../../hooks/useGetAllUserBill";
import { useGetBillById } from "../../../hooks/useGetBillById";
import { useGetInvoiceById } from "../../../hooks/useGetInvoiceById";
import { useUpdatePayment } from "../../../hooks/useUpdatePayment";
import { EditInvoiceForm } from "../../forms/edit-invoice";
import { getEditInvoiceSchema } from "../../forms/edit-invoice/editInvoiceSchema";
import { BillDetails } from "./BillDetails";

export const EditInvoiceModal = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="edit" size="small">
        <ModeEdit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah invoice"
        aria-describedby="Tambah invoice"
      >
        <ModalBody
          maxWidth={600}
          title="Ubah Invoice"
          handleClose={handleClose}
          content={<ModalContent id={id} handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ id, handleClose }) => {
  const { data: invoice, isLoading } = useGetInvoiceById(id);
  const { data: userBills } = useGetAllUserBill({ paginated: false });

  const userBillId = invoice?.user_bill_id;
  const userBill = userBills?.find((userBill) => userBill.id === userBillId);

  const billId = userBill?.bill_id;
  const userId = userBill?.user_id;

  const { data: bill } = useGetBillById(billId);
  const { data: user } = useGetUserById(userId, Boolean(userId));

  const { mutate: updatePayment } = useUpdatePayment({ invoiceId: id });
  const { mutate: editInvoice } = useEditInvoice({
    invoiceId: id,
    userBillId,
  });

  const handleSubmit = (values) => {
    const { payment_proof_note, payment_proof_uri } = values;
    const {
      payment_proof_note: initialProofNote,
      payment_proof_uri: initialProofUri,
    } = formik.initialValues;

    const shouldUpdatePayment =
      payment_proof_note !== initialProofNote ||
      payment_proof_uri !== initialProofUri;

    if (shouldUpdatePayment) {
      updatePayment(values);
    }

    editInvoice(values);
    handleClose();
  };

  const schema = getEditInvoiceSchema({ invoice });
  const formik = useFormik({
    initialValues: schema.getDefault(),
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  if (isLoading || !invoice) return;

  return (
    <Stack
      className="no-scrollbar"
      sx={{ overflowY: "auto" }}
      maxHeight="75vh"
      width="100%"
      gap={3}
    >
      <Stack width="100%" flexDirection="row" gap={1}>
        <FieldLabel name="Tagihan">
          <Select value={billId} size="small" disabled fullWidth>
            <MenuItem value={billId}>{bill?.name}</MenuItem>
          </Select>
        </FieldLabel>
        <FieldLabel name="Tagihan Pengguna">
          <Select value={userBillId} size="small" disabled fullWidth>
            <MenuItem value={userBillId}>{user?.name}</MenuItem>
          </Select>
        </FieldLabel>
      </Stack>
      <BillDetails billId={billId} userBillId={userBillId} />
      <FieldLabel name="Nilai Invoice">
        <TextField
          value={formatToRupiah(invoice?.amount)}
          size="small"
          disabled
        />
      </FieldLabel>
      <EditInvoiceForm handleClose={handleClose} formik={formik} />
    </Stack>
  );
};
