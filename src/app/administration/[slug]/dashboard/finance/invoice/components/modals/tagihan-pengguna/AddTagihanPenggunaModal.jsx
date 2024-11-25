"use client";

import AddIcon from "@mui/icons-material/Add";
import { Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { ModalBody } from "@/components/CustomModal";
import { CustomTable } from "@/components/CustomTable";

import { useCreateUserBill } from "../../../hooks/useCreateUserBill";
import { DaftarPenggunaSection } from "./components/DaftarPenggunaSection";
import { DaftarPenggunaTerpilihTableBody } from "./components/DaftarPenggunaTerpilihTableBody";
import { useUserFilter } from "./hooks/useUserFilter";
import { ModalFilters } from "./modal-filters";

export const AddTagihanPenggunaModal = () => {
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
        aria-labelledby="Modal tambah tagihan pengguna"
        aria-describedby="Tambah tagihan pengguna"
      >
        <ModalBody
          maxWidth={825}
          title="Buat Tagihan Pengguna"
          handleClose={handleClose}
          content={<ModalContent handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ handleClose }) => {
  /** Handles tagihan filter */
  const [tagihanId, setTagihanId] = useState("");

  /** Handles target filter */
  const [availableTarget, setAvailableTarget] = useState([]);
  const [target, setTarget] = useState("");

  /** Handles target user section filter */
  const { userFilter, setUserFilter } = useUserFilter({ target });
  const showUserTable = Boolean(tagihanId) && Boolean(target);

  /** Handles selected users */
  const [selectedUsers, setSelectedUsers] = useState([]);
  const selectedUserColumn = [
    "No.",
    "Nama",
    "Jenis Pembayaran",
    "Total Harga",
    "Buat Invoice",
    "Action",
  ];

  /** Handles selected users which also creates invoice */
  const [bundledInvoiceUsers, setBundledInvoiceUsers] = useState([]);

  const { mutate } = useCreateUserBill({ billId: tagihanId });
  const onSubmit = () => {
    if (selectedUsers.length === 0) return;
    selectedUsers.forEach((id) => {
      const bundled = bundledInvoiceUsers.includes(id);
      mutate({ userId: id, bundled });
    });
    handleClose();
  };

  return (
    <Stack
      className="no-scrollbar"
      sx={{ overflowY: "auto" }}
      maxHeight="75vh"
      width="100%"
      gap={3}
    >
      <ModalFilters
        availableTarget={availableTarget}
        tagihanId={tagihanId}
        target={target}
        setAvailableTarget={setAvailableTarget}
        setTagihanId={setTagihanId}
        setTarget={setTarget}
      />
      {showUserTable && (
        <DaftarPenggunaSection
          tagihanId={tagihanId}
          target={target}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          setBundledUsers={setBundledInvoiceUsers}
        />
      )}
      <Stack width="100%" gap={1}>
        <Typography fontSize="1em" fontWeight={600}>
          Daftar Pengguna Terpilih
        </Typography>
        <CustomTable
          minWidth={720}
          columns={selectedUserColumn}
          body={
            <DaftarPenggunaTerpilihTableBody
              tagihanId={tagihanId}
              columnCount={selectedUserColumn.length}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              bundledUsers={bundledInvoiceUsers}
              setBundledUsers={setBundledInvoiceUsers}
            />
          }
        />
      </Stack>
      <Stack
        className="bg-white pt-2 z-10"
        bottom={0}
        position="sticky"
        flexDirection="row"
        gap={2}
      >
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={handleClose}
        >
          Batal
        </Button>
        <Button type="submit" fullWidth variant="contained" onClick={onSubmit}>
          Buat
        </Button>
      </Stack>
    </Stack>
  );
};
