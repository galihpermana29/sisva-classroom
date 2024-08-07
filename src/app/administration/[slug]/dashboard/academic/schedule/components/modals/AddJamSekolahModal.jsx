"use client";

import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";
import { JamSekolahForm } from "../forms/jam-sekolah";

export const AddJamSekolahModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} disableElevation variant="contained">
        Tambah
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah jam sekolah"
        aria-describedby="Tambah jam sekolah"
      >
        <ModalBody
          title="Jam Sekolah"
          handleClose={handleClose}
          content={<JamSekolahForm handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};
