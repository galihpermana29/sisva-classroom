"use client";

import { ModalBody } from "@/components/CustomModal";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

export const AddTagihanModal = () => {
  const [open, setOpen] = useState(false);
  const [targets, setTargets] = useState([]);

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
        aria-labelledby="Modal tambah tagihan"
        aria-describedby="Tambah tagihan"
      >
        <ModalBody
          maxWidth={600}
          title="Buat Tagihan"
          handleClose={handleClose}
          content={
            <ModalContent
              targets={targets}
              setTargets={setTargets}
              handleClose={handleClose}
            />
          }
        />
      </Modal>
    </>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ModalContent = ({ targets, setTargets, handleClose }) => {
  const theme = useTheme();

  console.log(theme);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTargets(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Stack width="100%" gap={3}>
      <Stack width="100%" flexDirection="row" gap={1}>
        <Stack width="100%" gap={1}>
          <Typography fontWeight={600} variant="body2">
            Nama Tagihan <span className="text-[#F8412C]">*</span>
          </Typography>
          <TextField placeholder="Isi nama tagihan" size="small" />
        </Stack>
        <Stack width="100%" gap={1}>
          <Typography fontWeight={600} variant="body2">
            Batas Waktu
          </Typography>
          <DatePicker
            size="small"
            slotProps={{ textField: { size: "small" } }}
          />
        </Stack>
      </Stack>
      <Stack width="100%" flexDirection="row" gap={1}>
        <Stack width="100%" gap={1}>
          <Typography fontWeight={600} variant="body2">
            Harga (Tagihan Default) <span className="text-[#F8412C]">*</span>
          </Typography>
          <TextField placeholder="Rp 3000000" size="small" />
        </Stack>
        <Stack width="100%" gap={1}>
          <Typography fontWeight={600} variant="body2">
            Id Tagihan
          </Typography>
          <TextField placeholder="Isi Id Tagihan" size="small" />
        </Stack>
      </Stack>
      <Stack width="100%" gap={1}>
        <Typography fontWeight={600} variant="body2">
          Deskripsi <span className="text-[#F8412C]">*</span>
        </Typography>
        <TextField
          placeholder="Isi deskripsi pembayaran"
          size="small"
          multiline
          minRows={3}
          maxRows={5}
        />
      </Stack>
      <Stack width="100%" gap={1}>
        <Typography fontWeight={600} variant="body2">
          Target <span className="text-[#F8412C]">*</span>
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <Select
            multiple
            size="small"
            value={targets}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Stack
                    key={value}
                    bgcolor={theme.palette.base.base30}
                    paddingY={"4px"}
                    paddingX={"8px"}
                    borderRadius={"4px"}
                    flexDirection={"row"}
                    gap={"16px"}
                    alignItems={"center"}
                  >
                    <span>{value}</span>
                  </Stack>
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {targetData?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                // style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack flexDirection={"row"} justifyContent={"end"} gap={"12px"}>
        <Button onClick={handleClose}>Batal</Button>
        <Button variant="contained">Create</Button>
      </Stack>
    </Stack>
  );
};

const targetData = ["Siswa", "Guru", "Staff"];
