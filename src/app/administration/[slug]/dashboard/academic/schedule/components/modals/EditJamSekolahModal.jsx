"use client";

import { ModalBody } from "@/components/CustomModal";
import { ModeEdit } from "@mui/icons-material";
import { IconButton, Modal, Tooltip } from "@mui/material";
import { useState } from "react";
import { EditJamSekolahForm } from "../forms/jam-sekolah/editJamSekolah";

export const EditJamSekolahModal = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Ubah jadwal">
        <IconButton
          onClick={handleOpen}
          aria-label="edit"
          size="small"
        >
          <ModeEdit />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal ubah jam sekolah"
        aria-describedby="Ubah jam sekolah"
      >
        <ModalBody
          title="Jam Sekolah"
          handleClose={handleClose}
          content={
            <EditJamSekolahForm
              handleClose={handleClose}
              initialValues={data}
              id={data.id}
            />
          }
        />
      </Modal>
    </>
  );
};
