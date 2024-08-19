import { ModeEdit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { DeleteTagihanModal } from "../modals/tagihan/DeleteTagihanModal";

export const TagihanRowActions = ({ id, status }) => {
  return (
    <Stack flexDirection="row" justifyContent={"center"} width={"100%"} gap={1}>
      {status !== "published" && <DeleteTagihanModal id={id} />}
      <IconButton aria-label="edit" size="small">
        <ModeEdit />
      </IconButton>
    </Stack>
  );
};
