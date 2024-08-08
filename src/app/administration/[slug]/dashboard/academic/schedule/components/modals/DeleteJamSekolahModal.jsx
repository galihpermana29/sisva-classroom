"use client";

import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";
import { Delete } from "@mui/icons-material";
import Image from "next/image";

export const DeleteJamSekolahModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="delete" size="small">
        <Delete />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah jam sekolah"
        aria-describedby="Tambah jam sekolah"
      >
        <ModalBody
          maxWidth={400}
          handleClose={handleClose}
          content={<ModalContent handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ handleClose }) => {
  return (
    <Stack textAlign="center" justifyContent="center" alignItems="center">
      <Image
        className="subpixel-antialiased"
        alt="Trash icon"
        src="/images/delete-confirmation.gif"
        width={178}
        height={178}
        quality={100}
      />
      <Stack gap={3}>
        <Stack gap={1}>
          <Typography variant="h5" fontWeight={500}>
            Hapus Jadwal
          </Typography>
          <Typography variant="body1" className="text-pretty text-gray-400">
            Anda akan menghapus jadwal ini dari tabel jam sekolah. Apakah anda
            yakin?
          </Typography>
        </Stack>
        <Stack width="100%" flexDirection="row" gap={2}>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button type="submit" fullWidth variant="contained" color="error">
            Simpan
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
