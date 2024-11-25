"use client";

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

import { ModalBody } from "@/components/CustomModal";

import { useDeleteUserBill } from "../../../hooks/useDeleteUserBill";
import { useGetAllInvoices } from "../../../hooks/useGetAllInvoices";

export const DeleteTagihanPenggunaModal = ({ id, billId, userId }) => {
  const { data: invoice } = useGetAllInvoices({
    bill_id: billId,
    user_id: userId,
  });

  const isDisabled = invoice ? invoice.length !== 0 : false;

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip
        title={
          isDisabled
            ? "Tidak dapat menghapus tagihan pengguna yang sudah tertagih"
            : "Hapus tagihan pengguna"
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
        aria-labelledby="Modal hapus tagihan pengguna"
        aria-describedby="Hapus tagihan pengguna"
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
  const { mutate } = useDeleteUserBill({ id, handleClose });
  const handleClick = () => mutate();

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
            Anda akan menghapus tagihan pengguna ini. Apakah Anda yakin?
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
