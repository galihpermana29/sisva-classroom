import { ExcelIcon } from "@/assets/SVGs";
import { Button, Typography } from "@mui/material";

/** @description Custom button for excel export */
export const ExcelButton = ({ ...props }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<ExcelIcon />}
      sx={{
        height: "100%",
        borderColor: "green",
        backgroundColor: "white",
        "&:hover": {
          borderColor: "green",
        },
      }}
      {...props}
    >
      <Typography color="green">Excel</Typography>
    </Button>
  );
};
