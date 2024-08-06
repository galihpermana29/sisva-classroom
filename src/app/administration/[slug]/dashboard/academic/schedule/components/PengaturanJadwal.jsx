import { Divider, Stack, Typography } from "@mui/material";
import { AddJamSekolahModal } from "./modals/jam-sekolah";
import { Filters } from "./filters";

export const PengaturanJadwal = () => {
  return (
    <>
      <Stack
        gap={1}
        flexDirection="row"
        className="p-6"
        sx={{ overflowX: "auto" }}
      >
        <Filters />
      </Stack>
      <Divider variant="fullWidth" />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        className="p-6"
      >
        <Typography variant="body1" fontWeight={600}>
          Jam Sekolah
        </Typography>
        <AddJamSekolahModal />
      </Stack>
    </>
  );
};
