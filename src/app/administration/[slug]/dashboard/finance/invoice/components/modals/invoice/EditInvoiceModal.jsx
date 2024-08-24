"use client";

import { ModalBody } from "@/components/CustomModal";
import { ModeEdit } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useGetInvoiceById } from "../../../hooks/useGetInvoiceById";
import { BillDetails } from "./BillDetails";
import { useGetAllUserBill } from "../../../hooks/useGetAllUserBill";
import { useGetBillById } from "../../../hooks/useGetBillById";
import { useGetUserById } from "@/hooks/useGetUserById";
import { useFormik } from "formik";
import { EditInvoiceForm } from "../../forms/edit-invoice";
import { FieldLabel } from "@/components/FieldLabel";
import { getEditInvoiceSchema } from "../../forms/edit-invoice/editInvoiceSchema";
import { useEditInvoice } from "../../../hooks/useEditInvoice";
import { formatToRupiah } from "@/utils/formatToRupiah";

export const EditInvoiceModal = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="edit"
        size="small"
      >
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
          content={
            <ModalContent
              id={id}
              handleClose={handleClose}
            />
          }
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

  const { mutate: editInvoice } = useEditInvoice({
    invoiceId: id,
    userBillId,
    handleClose,
  });
  const schema = getEditInvoiceSchema({ invoice });
  const formik = useFormik({
    initialValues: schema.getDefault(),
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => editInvoice(values),
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
      <Stack
        width="100%"
        flexDirection="row"
        gap={1}
      >
        <FieldLabel name="Tagihan">
          <Select
            value={billId}
            size="small"
            disabled
            fullWidth
          >
            <MenuItem value={billId}>{bill?.name}</MenuItem>
          </Select>
        </FieldLabel>
        <FieldLabel name="Tagihan Pengguna">
          <Select
            value={userBillId}
            size="small"
            disabled
            fullWidth
          >
            <MenuItem value={userBillId}>{user?.name}</MenuItem>
          </Select>
        </FieldLabel>
      </Stack>
      <BillDetails
        billId={billId}
        userBillId={userBillId}
      />
      <FieldLabel name="Nilai Invoice">
        <TextField
          value={formatToRupiah(invoice?.amount)}
          size="small"
          disabled
        />
      </FieldLabel>
      <EditInvoiceForm
        handleClose={handleClose}
        formik={formik}
      />
    </Stack>
  );
};
