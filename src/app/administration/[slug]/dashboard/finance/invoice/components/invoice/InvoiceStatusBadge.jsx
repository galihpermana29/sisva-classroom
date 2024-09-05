import { Chip } from "@mui/material";

export const InvoiceStatusBadge = ({ children }) => {
  let label;
  let backgroundColor;
  let textColor;

  switch (children) {
    case "done":
      label = "Lunas";
      textColor = "#27AE60";
      backgroundColor = "#D9FFE9";
      break;
    case "inreview":
      label = "Verifikasi";
      textColor = "#F39038";
      backgroundColor = "#FFF0E4";
      break;
    case "pending":
      label = "Pending";
      textColor = "#F8412C";
      backgroundColor = "#FFDDD8";
      break;
    default:
      // Don't return anything if children value is not valid.
      return null;
  }

  return (
    <Chip
      sx={{
        color: textColor,
        backgroundColor,
        fontWeight: 500,
        paddingX: 0.6,
      }}
      label={label}
      variant="filled"
      size="small"
    />
  );
};
