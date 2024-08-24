import {
  Button,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { font } from "@/app/layout";

export const AddInvoiceForm = ({ formik, handleClose }) => {
  const theme = useTheme();
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
              ? parseInt(formik.values["amount"])
              : null
          }
          onChange={(event) => {
            formik.setFieldValue("amount", Number(event.target.value));
          }}
          onBlur={formik.handleBlur}
          error={formik.touched["amount"] && Boolean(formik.errors["amount"])}
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
          Catatan
        </Typography>
        <TextareaAutosize
          className={`p-2 ${font.className}`}
          id="note"
          name="note"
          value={
            formik.values && formik.values["note"]
              ? formik.values["note"]
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched["note"] && Boolean(formik.errors["note"])}
          style={{
            borderRadius: "0.25rem",
            border: `0.5px solid ${theme.palette.grey[600]}`,
          }}
          minRows={5}
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
