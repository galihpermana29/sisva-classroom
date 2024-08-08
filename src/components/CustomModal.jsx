import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";

export const ModalBody = forwardRef(
  ({ title, handleClose, maxWidth, content }, ref) => {
    return (
      <Box
        ref={ref}
        width="100%"
        maxWidth={maxWidth ?? 480}
        component={Paper}
        padding={3}
        tabIndex={-1}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 3,
        }}
      >
        <Stack spacing={2}>
          <ModalTitle title={title} handleClose={handleClose} />

          {title ? <Divider /> : null}

          {content}
        </Stack>
      </Box>
    );
  },
);

const ModalTitle = ({ title, handleClose }) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignSelf={title ? "auto" : "end"}
    >
      {title ? (
        <Typography fontSize="1em" fontWeight={600}>
          {title}
        </Typography>
      ) : null}
      <IconButton
        sx={{ padding: 0 }}
        onClick={handleClose}
        aria-label="Close modal"
      >
        <Close />
      </IconButton>
    </Stack>
  );
};
