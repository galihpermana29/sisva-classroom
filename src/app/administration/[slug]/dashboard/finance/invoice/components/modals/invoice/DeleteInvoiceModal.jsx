"use client";

import { ModalBody } from "@/components/CustomModal";
import { Delete } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDeleteInvoice } from "../../../hooks/useDeleteInvoice";

export const DeleteInvoiceModal = ({ id, isDisabled }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip
        title={
          isDisabled
            ? "Hanya dapat menghapus invoice dengan status pending"
            : "Hapus invoice"
        }
      >
        <span>
          <IconButton
            disabled={isDisabled}
            onClick={handleOpen}
            aria-label="hapus"
            size="small"
          >
            <Delete />
          </IconButton>
        </span>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal invoice"
        aria-describedby="Hapus invoice"
      >
        <ModalBody
          maxWidth={400}
          handleClose={handleClose}
          content={<ModalContent id={id} handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

const ModalContent = ({ id, handleClose }) => {
  const { mutate } = useDeleteInvoice(id);
  const handleClick = () => mutate();

  return (
    <Stack
      width="100%"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
    >
      <iframe
        className="border-0"
        src="https://lottie.host/embed/6d4a2abf-582d-43ab-bf7b-bcef061d5319/2JJjyKCiUO.json"
      ></iframe>
      <Stack width="100%" gap={3}>
        <Stack width="100%" gap={1}>
          <Typography variant="h5" fontWeight={500}>
            Hapus Invoice
          </Typography>
          <Typography variant="body1" className="text-pretty text-gray-400">
            Anda akan menghapus invoice ini. <br />
            Apakah Anda yakin?
          </Typography>
        </Stack>
        <Stack width="100%" flexDirection="row" gap={2}>
          <Button
            onClick={handleClose}
            sx={{ color: "lightslategray" }}
            type="button"
            fullWidth
            variant="outlined"
            color="inherit"
          >
            Batal
          </Button>
          <Button
            onClick={handleClick}
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
