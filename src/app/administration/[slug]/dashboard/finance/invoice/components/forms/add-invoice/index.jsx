import { Button, Stack, TextField, Typography } from "@mui/material";

export const AddInvoiceForm = ({ formik, handleClose }) => {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
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
          id="amount"
          name="amount"
          value={
            formik.values && formik.values["amount"]
              ? formatNumber(Number(formik.values["amount"]))
              : ""
          }
          onChange={(event) => {
            formik.setFieldValue(
              "amount",
              Number(unformatNumber(event.target.value))
            );
          }}
          onBlur={formik.handleBlur}
          error={formik.touched["amount"] && Boolean(formik.errors["amount"])}
          size="small"
          fullWidth
          InputProps={{ startAdornment: <span>Rp&nbsp;</span> }}
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
          Catatan
        </Typography>
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
      </Stack>

      <Stack
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Buat
        </Button>
      </Stack>
    </form>
  );
};

function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function unformatNumber(value) {
  return value.replace(/\./g, "");
}
