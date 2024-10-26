"use client";

import { ModalBody } from "@/components/CustomModal";
import { ModeEdit } from "@mui/icons-material";
import {
    Button,
    FormControl,
    IconButton,
    Modal,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import useMutateEditTagihan from "../../../hooks/useMutateEditTagihan";
import { tagihanSchema } from "./tagihanSchema";

export const EditTagihanModal = ({ initialValues }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="edit" size="small">
        <ModeEdit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        className="mx-2"
        aria-labelledby="Modal edit tagihan"
        aria-describedby="Edit tagihan"
      >
        <ModalBody
          maxWidth={600}
          title="Edit Tagihan"
          handleClose={handleClose}
          content={
            <ModalContent
              handleClose={handleClose}
              initialValues={initialValues}
            />
          }
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

const ModalContent = ({ handleClose, initialValues }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const refetchTagihan = () => queryClient.refetchQueries(["tagihan"]);

  const { mutate } = useMutateEditTagihan(handleClose, refetchTagihan);

  const formik = useFormik({
    initialValues: initialValues ?? {
      custom_id: "",
      name: "",
      status: "",
      target_user_types: [],
      amount: "",
      description: "",
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
              slotProps={{ textField: { size: "small" } }}
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
              error={formik.touched.deadline && Boolean(formik.errors.deadline)}
            />
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
                formik.values.amount ? formatNumber(formik.values.amount) : null
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
              disabled
              multiple
              size="small"
              className="capitalize"
              value={formik?.values ? formik.values.target_user_types : []}
              onBlur={formik.handleBlur}
              error={
                formik.touched.target_user_types &&
                Boolean(formik.errors.target_user_types)
              }
              renderValue={(selected) =>
                targetData
                  .filter(
                    ({ value }) =>
                      selected.findIndex((target) => target === value) > -1
                  )
                  .map(({ label }) => label)
                  .join(", ")
              }
              MenuProps={MenuProps}
            ></Select>
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
          <Button disabled={!formik.dirty} type="submit" variant="contained">
            Edit
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
