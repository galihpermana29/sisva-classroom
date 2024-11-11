import { Divider, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import { PengaturanJadwalFilters } from "../filters/pengaturan-jadwal";
import { AddJamSekolahModal } from "../modals/AddJamSekolahModal";
import { PengaturanJadwalFilterAlert } from "../PengaturanJadwalFilterAlert";
import { TablePengaturanJadwal } from "../tables/table-pengaturan-jadwal";

export const PengaturanJadwal = () => {
  return (
    <Stack paddingY={3} spacing={3}>
      <Suspense>
        <PengaturanJadwalFilterAlert />
      </Suspense>
      <Stack
        gap={1}
        paddingX={3}
        flexDirection="row"
        sx={{ overflowX: "auto" }}
        className="no-scrollbar"
      >
        <Suspense>
          <PengaturanJadwalFilters />
        </Suspense>
      </Stack>
      <Divider variant="fullWidth" />
      <Stack
        paddingX={3}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <Typography variant="body1" fontWeight={600}>
          Jam Sekolah
        </Typography>
        <AddJamSekolahModal />
      </Stack>
      <Stack>
        <Divider variant="fullWidth" />
        <TablePengaturanJadwal />
      </Stack>
    </Stack>
  );
};
