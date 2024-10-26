"use client";

import { ModalBody } from "@/components/CustomModal";
import AddIcon from "@mui/icons-material/Add";
import { Alert, Button, Modal, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCreateInvoice } from "../../../hooks/useCreateInvoice";
import { AddInvoiceForm } from "../../forms/add-invoice";
import { addInvoiceSchema } from "../../forms/add-invoice/addInvoiceSchema";
import { BillDetails } from "./BillDetails";
import { ModalTagihanFilter } from "./modal-filters/ModalTagihanFilter";
import { ModalTagihanPenggunaFilter } from "./modal-filters/ModalTagihanPenggunaFilter";

export const AddInvoiceModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        disableElevation
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah invoice"
        aria-describedby="Tambah invoice"
      >
        <ModalBody
          maxWidth={600}
          title="Buat Invoice"
          handleClose={handleClose}
          content={<ModalContent handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ handleClose }) => {
  const [filters, setFilters] = useState({ tagihan: "", tagihanPengguna: "" });
  const [filterError, setFilterError] = useState("");
  const ableToSubmit = filters.tagihan !== "" && filters.tagihanPengguna !== "";
  const { mutate } = useCreateInvoice({
    userBillId: filters.tagihanPengguna,
    handleClose,
  });

  useEffect(() => {
    if (ableToSubmit) {
      setFilterError("");
    }
  }, [ableToSubmit]);

  const formik = useFormik({
    initialValues: { amount: "", note: "" },
    validationSchema: addInvoiceSchema,
    onSubmit: (values) =>
      ableToSubmit
        ? mutate(values)
        : setFilterError(
            "Harap pilih tagihan dan tagihan pengguna terlebih dahulu!"
          ),
  });

  return (
    <Stack
      width="100%"
      gap={3}
    >
      <Stack
        width="100%"
        flexDirection="row"
        gap={1}
      >
        <ModalTagihanFilter
          value={filters}
          setValue={setFilters}
        />
        <ModalTagihanPenggunaFilter
          value={filters}
          setValue={setFilters}
        />
      </Stack>
      {filterError ? (
        <Alert
          variant="filled"
          severity="error"
        >
          {filterError}
        </Alert>
      ) : null}
      <BillDetails
        billId={filters.tagihan}
        userBillId={filters.tagihanPengguna}
      />
      <AddInvoiceForm
        formik={formik}
        handleClose={handleClose}
      />
    </Stack>
  );
};
