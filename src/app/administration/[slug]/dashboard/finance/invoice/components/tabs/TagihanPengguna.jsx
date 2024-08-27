import { Divider, Paper, Stack } from "@mui/material";
import { TableTagihanPengguna } from "../tables/tagihan-pengguna";
import { TagihanPenggunaData } from "../tagihan-pengguna/TagihanPenggunaData";
import { TagihanPenggunaPagination } from "../tagihan-pengguna/TagihanPenggunaPagination";

/** @description Component showing the main content of tagihan pengguna tab */
export const TagihanPengguna = () => {
  return (
    <Stack
      flexDirection="column"
      flexGrow={1}
    >
      <Divider sx={{ display: { xs: "none", lg: "block" } }} />
      <Stack display={{ xs: "none", lg: "flex" }}>
        <TableTagihanPengguna />
      </Stack>
      <Stack
        display={{ xs: "flex", lg: "none" }}
        padding={2}
        flexGrow={1}
      >
        <TagihanPenggunaData />
      </Stack>
      <Stack
        padding={2}
        component={Paper}
        position="sticky"
        bottom={0}
      >
        <TagihanPenggunaPagination />
      </Stack>
    </Stack>
  );
};
