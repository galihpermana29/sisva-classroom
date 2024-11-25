import { Button, Typography } from "@mui/material";

import { ExcelIcon } from "@/assets/SVGs";

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
