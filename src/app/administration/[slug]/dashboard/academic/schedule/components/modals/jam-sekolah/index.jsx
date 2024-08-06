"use client";

import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DaySelect } from "./DaySelect";
import { TimeSelect } from "./TimeSelect";

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
        <ModalContent
          handleClose={handleClose}
          footer={<ModalFooter handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ handleClose, footer }) => {
  return (
    <Box
      width="100%"
      maxWidth={420}
      component={Paper}
      padding={3}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: 3,
      }}
    >
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography fontSize="1em" fontWeight={600}>
              Jam Sekolah
            </Typography>
            <IconButton
              sx={{ padding: 0 }}
              onClick={handleClose}
              aria-label="Close modal"
            >
              <Close />
            </IconButton>
          </Stack>

          <Divider />

          <DaySelect />

          <TimeSelect />
        </Stack>

        {footer}
      </Stack>
    </Box>
  );
};

const ModalFooter = ({ handleClose }) => {
  return (
    <Stack flexDirection="row" gap={2}>
      <Button fullWidth variant="outlined" onClick={handleClose}>
        Batal
      </Button>
      <Button fullWidth variant="contained">
        Simpan
      </Button>
    </Stack>
  );
};
