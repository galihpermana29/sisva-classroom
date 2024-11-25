import { Delete } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

import { EditJamSekolahModal } from "../../modals/EditJamSekolahModal";

export const ActionButtons = ({ data }) => {
  return (
    <Stack flexDirection="row" maxWidth="fit-content" gap={1}>
      <EditJamSekolahModal data={data} />
      <IconButton aria-label="delete" size="small">
        <Delete />
      </IconButton>
    </Stack>
  );
};
