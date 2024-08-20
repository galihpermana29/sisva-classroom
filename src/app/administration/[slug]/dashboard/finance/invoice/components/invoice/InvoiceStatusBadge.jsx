import { Chip } from "@mui/material";

export const InvoiceStatusBadge = ({ children }) => {
  let label;
  let color;

  switch (children) {
    case "lunas":
      label = "Lunas";
      color = "success";
      break;
    case "verifikasi":
      label = "Verifikasi";
      color = "warning";
      break;
    case "pending":
      label = "Pending";
      color = "error";
      break;
    default:
      // Don't return anything if children value is not valid.
      return null;
  }

  return (
    <Chip
      label={label}
      color={color}
      variant="filled"
      size="small"
    />
  );
};
