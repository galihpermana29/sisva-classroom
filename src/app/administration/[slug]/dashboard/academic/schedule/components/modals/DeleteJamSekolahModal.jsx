"use client";

import {
  Button,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";
import { Delete } from "@mui/icons-material";
import { useDeleteSchoolSchedule } from "../../hooks/useDeleteSchoolSchedule";
import { useFilterStatus } from "../../hooks/filters/useFilterStatus";

export const DeleteJamSekolahModal = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ableToDelete = data.status === "inactive";

  return (
    <>
      <Tooltip
        title={
          ableToDelete
            ? "Hapus jadwal"
            : "Hanya dapat menghapus jadwal yang tidak aktif"
        }
      >
        <span>
          <IconButton
            disabled={!ableToDelete}
            onClick={handleOpen}
            aria-label="delete"
            size="small"
          >
            <Delete />
          </IconButton>
        </span>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah jam sekolah"
        aria-describedby="Tambah jam sekolah"
      >
        <ModalBody
          maxWidth={400}
          handleClose={handleClose}
          content={
            <ModalContent
              id={data.id}
              handleClose={handleClose}
            />
          }
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ id, handleClose }) => {
  const { periode } = useFilterStatus();
  const { mutate } = useDeleteSchoolSchedule({ handleClose, id, periode });
  const handleSubmit = () => mutate();

  return (
    <Stack
      textAlign="center"
      justifyContent="center"
      alignItems="center"
    >
      <iframe
        className="border-0"
        src="https://lottie.host/embed/6d4a2abf-582d-43ab-bf7b-bcef061d5319/2JJjyKCiUO.json"
      ></iframe>
      <Stack gap={3}>
        <Stack gap={1}>
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Hapus Jadwal
          </Typography>
          <Typography
            variant="body1"
            className="text-pretty text-gray-400"
          >
            Anda akan menghapus jadwal ini dari tabel jam sekolah. Apakah anda
            yakin?
          </Typography>
        </Stack>
        <Stack
          width="100%"
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
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="error"
          >
            Hapus
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
