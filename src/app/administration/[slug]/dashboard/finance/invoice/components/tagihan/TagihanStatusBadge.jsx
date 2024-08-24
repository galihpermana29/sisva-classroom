import { Chip } from "@mui/material";

export const TagihanStatusBadge = ({ children }) => {
  let label;
  let color;

  switch (children) {
    case "draft":
      label = "Draft";
      color = "warning";
      break;
    case "published":
      label = "Published";
      color = "success";
      break;
    default:
      // Don't return anything if children value is not valid.
      return null;
  }

  return <Chip label={label} color={color} variant="filled" size="small" />;
};
