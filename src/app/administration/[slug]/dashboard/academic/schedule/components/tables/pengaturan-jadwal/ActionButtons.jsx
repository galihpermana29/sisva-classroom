import { Stack } from "@mui/material";
import { EditJamSekolahModal } from "../../modals/EditJamSekolahModal";
import { DeleteJamSekolahModal } from "../../modals/DeleteJamSekolahModal";

export const ActionButtons = ({ data }) => {
  return (
    <Stack flexDirection="row" maxWidth="fit-content" gap={1}>
      <EditJamSekolahModal data={data} />
      <DeleteJamSekolahModal />
    </Stack>
  );
};
