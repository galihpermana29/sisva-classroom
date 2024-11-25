"use client";

import { Button, Modal, Tooltip } from "@mui/material";
import { useState } from "react";

import { ModalBody } from "@/components/CustomModal";

import { useFilterStatus } from "../../hooks/filters/useFilterStatus";
import { useGetActiveSchoolSchedule } from "../../hooks/useGetActiveSchoolSchedule";
import { AddJamSekolahForm } from "../forms/jam-sekolah/addJamSekolah";

export const AddJamSekolahModal = () => {
  const { data } = useGetActiveSchoolSchedule();
  const { periode, prodi, tingkat } = useFilterStatus();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // enabled when filters are selected and school schedule data is less than or equal to 7
  const isEnabled =
    Boolean(prodi && periode && tingkat) && Boolean(data && data.length < 7);

  return (
    <>
      <Tooltip
        title={
          isEnabled ? "Tambah jam sekolah" : "Tidak dapat menambahkan jadwal"
        }
      >
        <span>
          <Button
            disabled={!isEnabled}
            onClick={handleOpen}
            disableElevation
            variant="contained"
          >
            Tambah
          </Button>
        </span>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah jam sekolah"
        aria-describedby="Tambah jam sekolah"
      >
        <ModalBody
          title="Jam Sekolah"
          handleClose={handleClose}
          content={<AddJamSekolahForm handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};
