"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Checkbox,
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
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";

import { ModalBody } from "@/components/CustomModal";

import useMutateCreateTagihan from "../../../hooks/useMutateCreateTagihan";
import { tagihanSchema } from "./tagihanSchema";

export const AddTagihanModal = () => {
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
        className="mx-2"
        aria-labelledby="Modal tambah tagihan"
        aria-describedby="Tambah tagihan"
      >
        <ModalBody
          maxWidth={600}
          title="Buat Tagihan"
          handleClose={handleClose}
          content={<ModalContent handleClose={handleClose} />}
        />
      </Modal>
    </>
  );
};

function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function unformatNumber(value) {
  return value.replace(/\./g, "");
}

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

const ModalContent = ({ handleClose }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const refetchTagihan = () => queryClient.refetchQueries(["tagihan"]);

  const { mutate } = useMutateCreateTagihan(handleClose, refetchTagihan);

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "draft",
      target_user_types: [],
      amount: "",
      deadline: null,
    },
    enableReinitialize: true,
    validationSchema: tagihanSchema,
    onSubmit: (values) => mutate(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack width="100%" gap={3}>
        <Stack width="100%" flexDirection="row" gap={1}>
          <Stack width="100%" gap={1}>
            <Typography fontWeight={600} variant="body2">
              Nama Tagihan <span className="text-[#F8412C]">*</span>
            </Typography>
            <TextField
              placeholder="Isi nama tagihan"
              size="small"
              value={formik?.values ? formik.values?.name : ""}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name && (
              <Typography color={theme.palette.error.main} fontSize={"12px"}>
                {formik.errors.name}
              </Typography>
            )}
          </Stack>
          <Stack width="100%" gap={1}>
            <Typography fontWeight={600} variant="body2">
              Batas Waktu <span className="text-[#F8412C]">*</span>
            </Typography>
            <DatePicker
              size="small"
              minDate={dayjs()}
              slotProps={{
                textField: {
                  size: "small",
                  error:
                    formik.touched.deadline && Boolean(formik.errors.deadline),
                },
              }}
              value={
                formik?.values?.deadline
                  ? dayjs(formik.values?.deadline, "DD/MM/YYYY h:mm A Z")
                  : null
              }
              onChange={(value) => {
                const formattedDate = dayjs(value)
                  .set("hour", 23)
                  .set("minute", 59)
                  .format("DD/MM/YYYY h:mm A Z");
                formik.setFieldValue("deadline", formattedDate);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.deadline && formik.errors.deadline && (
              <Typography color={theme.palette.error.main} fontSize={"12px"}>
                {formik.errors.deadline}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack width="100%" flexDirection="row" gap={1}>
          <Stack width="100%" gap={1}>
            <Typography fontWeight={600} variant="body2">
              Harga (Tagihan Default) <span className="text-[#F8412C]">*</span>
            </Typography>
            <TextField
              placeholder="Rp 3000000"
              size="small"
              value={
                formik.values.amount ? formatNumber(formik.values.amount) : ""
              }
              onChange={(e) => {
                const unformattedValue = unformatNumber(e.target.value);
                formik.setFieldValue("amount", Number(unformattedValue));
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
            />
            {formik.touched.amount && formik.errors.amount && (
              <Typography color={theme.palette.error.main} fontSize={"12px"}>
                {formik.errors.amount}
              </Typography>
            )}
          </Stack>
          <Stack width="100%" gap={1}>
            <Typography fontWeight={600} variant="body2">
              Id Tagihan
            </Typography>
            <TextField
              placeholder="Isi Id Tagihan"
              size="small"
              value={formik?.values ? formik.values.custom_id : ""}
              onChange={(e) =>
                formik.setFieldValue("custom_id", e.target.value)
              }
              onBlur={formik.handleBlur}
              error={
                formik.touched.custom_id && Boolean(formik.errors.custom_id)
              }
            />
          </Stack>
        </Stack>
        <Stack width="100%" gap={1}>
          <Typography fontWeight={600} variant="body2">
            Deskripsi
          </Typography>
          <TextField
            placeholder="Isi deskripsi pembayaran"
            size="small"
            multiline
            minRows={3}
            maxRows={5}
            value={formik?.values ? formik.values.description : ""}
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
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
              className="capitalize"
              value={formik?.values ? formik.values.target_user_types : []}
              onChange={(e) => {
                formik.setFieldValue("target_user_types", e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.target_user_types &&
                Boolean(formik.errors.target_user_types)
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {targetData
                    .filter(
                      ({ value }) =>
                        selected.findIndex((target) => target === value) > -1
                    )
                    .map(({ label }, index) => (
                      <Stack
                        key={index}
                        bgcolor={"base.base30"}
                        paddingY={"4px"}
                        paddingX={"8px"}
                        borderRadius={"4px"}
                        flexDirection={"row"}
                        gap={"16px"}
                        alignItems={"center"}
                      >
                        <span>{label}</span>
                      </Stack>
                    ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {targetData?.map(({ label, value }, index) => (
                <MenuItem key={index} value={value} className="capitalize">
                  <Checkbox
                    checked={
                      formik.values?.target_user_types?.indexOf(value) > -1
                    }
                  />
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.touched.target_user_types &&
            formik.errors.target_user_types && (
              <Typography color={theme.palette.error.main} fontSize={"12px"}>
                {formik.errors.target_user_types}
              </Typography>
            )}
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"end"} gap={"12px"}>
          <Button onClick={handleClose}>Batal</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

const targetData = [
  {
    label: "Siswa",
    value: "student",
  },
  {
    label: "Staff",
    value: "staff",
  },
];
