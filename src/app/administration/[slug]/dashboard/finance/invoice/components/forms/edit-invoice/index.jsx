"use client";

import { FieldLabel } from "@/components/FieldLabel";
import { FileUpload } from "@/components/FileUpload";
import { getImageUrl } from "@/utils/getImageUrl";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import Image from "next/image";

export const EditInvoiceForm = ({ formik, handleClose }) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <FieldLabel name="Status">
        <LocalStatusSelect
          id="status"
          name="status"
          value={
            formik.values && formik.values["status"]
              ? formik.values["status"]
              : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched["status"] && Boolean(formik.errors["status"])}
        />
      </FieldLabel>
      <FieldLabel name="Deskripsi">
        <TextField
          id="note"
          name="note"
          value={
            formik.values && formik.values["note"] ? formik.values["note"] : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched["note"] && Boolean(formik.errors["note"])}
          size="small"
          multiline
        />
      </FieldLabel>
      <FieldLabel name="Bukti Pembayaran">
        <FileUpload
          id="payment_proof_uri"
          name="payment_proof_uri"
          value={
            formik.values && formik.values["payment_proof_uri"]
              ? formik.values["payment_proof_uri"]
              : null
          }
          error={
            formik.touched["payment_proof_uri"] &&
            Boolean(formik.errors["payment_proof_uri"])
          }
          accept="image/*"
          afterUpload={(data) => {
            const imageUrl = getImageUrl(data?.data?.data);
            formik.setFieldValue("payment_proof_uri", imageUrl);
          }}
        />
        {formik.values["payment_proof_uri"] ? (
          <div className="relative flex justify-center max-h-96 overflow-y-auto rounded-lg">
            <Image
              height={384}
              width={600}
              src={formik.values["payment_proof_uri"]}
              style={{ height: "max-content", width: "100%" }}
              alt=""
            />
          </div>
        ) : null}
      </FieldLabel>
      <FieldLabel name="Catatan Pembayaran">
        <TextField
          id="payment_proof_note"
          name="payment_proof_note"
          value={
            formik.values && formik.values["payment_proof_note"]
              ? formik.values["payment_proof_note"]
              : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched["payment_proof_note"] &&
            Boolean(formik.errors["payment_proof_note"])
          }
          size="small"
          multiline
        />
      </FieldLabel>
      <Stack
        className="bg-white pt-2"
        bottom={0}
        position="sticky"
        flexDirection="row"
        gap={2}
      >
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={handleClose}
        >
          Batal
        </Button>
        <Button type="submit" fullWidth variant="contained">
          Simpan
        </Button>
      </Stack>
    </form>
  );
};

const LocalStatusSelect = (props) => {
  return (
    <Select size="small" displayEmpty {...props}>
      <MenuItem disabled value="">
        Status
      </MenuItem>
      <MenuItem value="done">Lunas</MenuItem>
      <MenuItem value="inreview">Verifikasi</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
    </Select>
  );
};
