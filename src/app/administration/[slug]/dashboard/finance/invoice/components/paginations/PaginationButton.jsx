import { Button, Typography } from "@mui/material";

export const PaginationButton = ({ startIcon, endIcon, text, ...props }) => {
  return (
    <Button
      sx={{
        paddingX: { xs: 0.75, lg: 1.5 },
        display: "flex",
        flexDirection: "row",
        gap: 0.75,
        color: "gray",
        borderColor: "gray",
        paddingY: 0.75,
      }}
      color="inherit"
      variant="outlined"
      size="small"
      {...props}
    >
      {startIcon}
      <Typography
        variant="body2"
        sx={{ display: { xs: "none", lg: "inline" } }}
      >
        {text}
      </Typography>
      {endIcon}
    </Button>
  );
};
