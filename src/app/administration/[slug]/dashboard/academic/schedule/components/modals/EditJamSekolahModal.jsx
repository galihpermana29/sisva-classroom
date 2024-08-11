"use client";

import { IconButton, Modal } from "@mui/material";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";
import { ModeEdit } from "@mui/icons-material";
import { JamSekolahForm } from "../forms/jam-sekolah";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo } from "react";

dayjs.extend(customParseFormat);

export const EditJamSekolahModal = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = useMemo(
    () => ({
      day: data.day,
      start_time: dayjs(data.start_time, "H:mm a Z"),
      end_time: dayjs(data.end_time, "H:mm a Z"),
    }),
    [data.day, data.start_time, data.end_time]
  );

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
        aria-labelledby="Modal ubah jam sekolah"
        aria-describedby="Ubah jam sekolah"
      >
        <ModalBody
          title="Jam Sekolah"
          handleClose={handleClose}
          content={
            <JamSekolahForm
              edit
              handleClose={handleClose}
              initialValues={initialValues}
            />
          }
        />
      </Modal>
    </>
  );
};
