"use client";

import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Modal,
  Select,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ModalBody } from "@/components/CustomModal";
import { Delete, ModeEdit, Search } from "@mui/icons-material";
import { ProdiSelect } from "@/app/administration/[slug]/dashboard/academic/schedule/components/filters/ProdiSelect";
import { TingkatSelect } from "@/app/administration/[slug]/dashboard/academic/schedule/components/filters/TingkatSelect";
import { KelasSelect } from "@/app/administration/[slug]/dashboard/academic/schedule/components/filters/KelasSelect";
import { CustomTable } from "@/components/CustomTable";
import { Paginations } from "../../paginations";

export const AddTagihanPenggunaModal = () => {
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
        aria-labelledby="Modal tambah tagihan pengguna"
        aria-describedby="Tambah tagihan pengguna"
      >
        <ModalBody
          maxWidth={825}
          title="Buat Tagihan Pengguna"
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
            Target
          </Typography>
          <Select
            size="small"
            fullWidth
          />
        </Stack>
      </Stack>
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontSize="1em"
          fontWeight={600}
        >
          Daftar Pengguna
        </Typography>
        <Stack
          flexDirection={{ md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ xs: 1.5, md: 3 }}
        >
          <TextField
            size="small"
            fullWidth
            sx={{ maxWidth: { md: "14rem" } }}
            InputProps={{ endAdornment: <Search /> }}
          />
          <Stack
            width="100%"
            flexDirection="row"
            gap={0.5}
            alignItems="center"
            justifyContent="end"
          >
            <ProdiSelect />
            <TingkatSelect />
            <KelasSelect />
          </Stack>
        </Stack>
      </Stack>
      <CustomTable
        minWidth={240}
        columns={[<Checkbox disabled />, "Nama", "Target"]}
        body={<DaftarPenggunaTableBody />}
      />
      <Paginations />
      <Stack
        width="100%"
        gap={1}
      >
        <Typography
          fontSize="1em"
          fontWeight={600}
        >
          Daftar Pengguna
        </Typography>
        <CustomTable
          minWidth={720}
          columns={[
            "",
            "Nama",
            "Jenis Pembayaran",
            "Total Harga",
            "Buat Invoice",
            "Action",
          ]}
          body={<DaftarPenggunaTerpilihTableBody />}
        />
      </Stack>
    </Stack>
  );
};

const DaftarPenggunaTableBody = () => {
  return (
    <TableRow hover>
      <TableCell sx={{ minWidth: 0, width: "1em" }}>
        <Checkbox />
      </TableCell>
      <TableCell>Arsa</TableCell>
      <TableCell>Siswa</TableCell>
    </TableRow>
  );
};

const DaftarPenggunaTerpilihTableBody = () => {
  return (
    <TableRow hover>
      <TableCell sx={{ minWidth: 0, width: "1em" }}>
        <Checkbox />
      </TableCell>
      <TableCell>Bagas</TableCell>
      <TableCell>SPP</TableCell>
      <TableCell>Rp500,000</TableCell>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>
        <Stack
          flexDirection="row"
          maxWidth="fit-content"
          gap={1}
        >
          <IconButton
            aria-label="edit"
            size="small"
          >
            <ModeEdit />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
          >
            <Delete />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
