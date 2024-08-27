import { Chip } from "@mui/material";

export const TagihanStatusBadge = ({ children }) => {
  let label;
  let bgColor;
  let color;

  switch (children) {
    case "draft":
      label = "Draft";
      bgColor = "#FFF1E5";
      color = "#F2994A";
      break;
    case "published":
      label = "Published";
      bgColor = "#D9FFE9";
      color = "#27AE60";
      break;
    default:
      // Don't return anything if children value is not valid.
      return null;
  }

  return (
    <Chip
      label={label}
      variant="filled"
      size="small"
      sx={{
        padding: "2px 8px",
        fontSize: "12px",
        color: color,
        backgroundColor: bgColor,
      }}
    />
  );
};
