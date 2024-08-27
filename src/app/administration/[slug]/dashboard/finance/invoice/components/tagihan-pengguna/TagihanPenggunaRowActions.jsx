import { ModeEdit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { DeleteTagihanPenggunaModal } from "../modals/tagihan-pengguna/DeleteTagihanPenggunaModal";

export const TagihanPenggunaRowActions = ({ id }) => {
  return (
    <Stack
      flexDirection="row"
      maxWidth="fit-content"
      gap={1}
    >
      <IconButton
        aria-label="edit"
        size="small"
      >
        <ModeEdit />
      </IconButton>

      <DeleteTagihanPenggunaModal id={id} />
    </Stack>
  );
};
