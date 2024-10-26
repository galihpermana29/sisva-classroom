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
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useMutateDeleteTagihan from "../../../hooks/useMutateDeleteTagihan";

export const DeleteTagihanModal = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Hapus tagihan">
        <IconButton onClick={handleOpen} aria-label="hapus" size="small">
          <Delete />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        className="mx-2"
        aria-labelledby="Modal hapus tagihan"
        aria-describedby="Hapus tagihan"
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
  const queryClient = useQueryClient();

  const refetchTagihan = () => queryClient.refetchQueries(["tagihan"]);

  const { mutate } = useMutateDeleteTagihan(handleClose, refetchTagihan);

  return (
    <Stack textAlign="center" justifyContent="center" alignItems="center">
      <iframe
        className="border-0"
        src="https://lottie.host/embed/6d4a2abf-582d-43ab-bf7b-bcef061d5319/2JJjyKCiUO.json"
      ></iframe>
      <Stack gap={3}>
        <Stack gap={1}>
          <Typography variant="h5" fontWeight={500}>
            Hapus Tagihan
          </Typography>
          <Typography variant="body1" className="text-pretty text-gray-400">
            Anda akan menghapus tagihan ini. Apakah Anda yakin?
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
            onClick={() => mutate(id)}
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
