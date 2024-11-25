import { Stack } from "@mui/material";

import { DeleteTagihanModal } from "../modals/tagihan/DeleteTagihanModal";
import { EditTagihanModal } from "../modals/tagihan/EditTagihanModal";

export const TagihanRowActions = ({ id, status, data }) => {
  return (
    <Stack flexDirection="row" justifyContent={"center"} gap={1}>
      {status !== "published" && <DeleteTagihanModal id={id} />}
      <EditTagihanModal initialValues={data} />
    </Stack>
  );
};
