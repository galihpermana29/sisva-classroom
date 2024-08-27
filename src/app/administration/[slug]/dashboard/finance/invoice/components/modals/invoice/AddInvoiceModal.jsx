"use client";

import {
  Button,
  Modal,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";

export const AddInvoiceModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        disableElevation
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal tambah invoice"
        aria-describedby="Tambah invoice"
      >
        <ModalBody
          maxWidth={600}
          title="Buat Invoice"
          handleClose={handleClose}
          content={<ModalContent />}
        />
      </Modal>
    </>
  );
};

const ModalContent = () => {
  return (
    <Stack
      width="100%"
      gap={3}
    >
      <Stack
        width="100%"
        flexDirection="row"
        gap={1}
      >
        <Stack
          width="100%"
          gap={1}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            Pilih Tagihan
          </Typography>
          <Select
            size="small"
            fullWidth
          />
        </Stack>
        <Stack
          width="100%"
          gap={1}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            Pilih Tagihan Pengguna
          </Typography>
          <Select
            size="small"
            fullWidth
          />
        </Stack>
      </Stack>
      <Stack
        width="100%"
        className="grid grid-cols-2 gap-y-5"
      >
        <Stack
          width="100%"
          gap={1}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            Total Harga
          </Typography>
          <Typography variant="body2">Rp300,000</Typography>
        </Stack>
        <Stack
          width="100%"
          gap={1}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            Invoice Aktif
          </Typography>
          <Typography variant="body2">TBA</Typography>
        </Stack>
        <Stack
          width="100%"
          gap={1}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            Total Tertagih
          </Typography>
          <Typography variant="body2">Rp200,000</Typography>
        </Stack>
        <Stack
          width="100%"
          gap={1}
        >
          <Typography
            fontWeight={600}
            variant="body2"
          >
            Sisa Tagihan
          </Typography>
          <Typography variant="body2">Rp100,000</Typography>
        </Stack>
      </Stack>
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontWeight={600}
          variant="body2"
        >
          Nilai Invoice
        </Typography>
        <TextField
          size="small"
          fullWidth
          InputProps={{ startAdornment: "Rp " }}
        />
      </Stack>
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontWeight={600}
          variant="body2"
        >
          Nilai Invoice
        </Typography>
        <TextareaAutosize
          minRows={5}
          fullWidth
        />
      </Stack>
    </Stack>
  );
};
