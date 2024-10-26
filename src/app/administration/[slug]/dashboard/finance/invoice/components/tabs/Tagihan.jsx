import { Divider, Paper, Stack } from "@mui/material";
import TableTagihan from "../tables/tagihan";
import { TagihanData } from "../tagihan/TagihanData";
import { TagihanPagination } from "../tagihan/TagihanPagination";

function Tagihan() {
  return (
    <Stack flexDirection="column" flexGrow={1}>
      <Divider sx={{ display: { xs: "none", lg: "block" } }} />
      <Stack display={{ xs: "none", lg: "flex" }}>
        <TableTagihan />
      </Stack>
      <Stack display={{ xs: "flex", lg: "none" }} padding={2} flexGrow={1}>
        <TagihanData />
      </Stack>
      <Stack padding={2} component={Paper} position="sticky" bottom={0}>
        <TagihanPagination />
      </Stack>
    </Stack>
  );
}

export default Tagihan;
