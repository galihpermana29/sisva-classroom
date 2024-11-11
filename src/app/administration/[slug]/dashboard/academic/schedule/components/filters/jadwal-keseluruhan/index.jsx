"use client";

import SyncIcon from "@mui/icons-material/Sync";
import { Button, Stack, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { useFilterStatus } from "../../../hooks/filters/useFilterStatus";
import useJadwalKeseluruhanFilter from "../../../hooks/useJadwalKeseluruhanFilter";
import AddAktivitasNonKbmModal from "../../modals/AddAktivitasNonKbmModal";
import AddJadwalKelasModal from "../../modals/AddJadwalKelasModal";
import JadwalKeseluruhanOptionalFiltersModal from "../JadwalKeseluruhanOptionalFiltersModal";
import { JadwalKeseluruhanSwitch } from "../JadwalKeseluruhanSwitch";
import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";

function JadwalKeseluruhanFilters() {
  const { periode, prodi, isJadwalKeseluruhan } = useFilterStatus();

  const showProdi = Boolean(periode);
  const showOptionalFilters = Boolean(prodi);

  const theme = useTheme();

  const {
    handleReset,
    periodeSelectData,
    prodiSelectData,
    tingkatanSelectData,
    kelasSelectData,
    hariSelectData,
  } = useJadwalKeseluruhanFilter();

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <PeriodeSelect data={periodeSelectData} />
        {isJadwalKeseluruhan === "true" && showProdi && (
          <>
            <ProdiSelect data={prodiSelectData} />
            {showOptionalFilters && (
              <JadwalKeseluruhanOptionalFiltersModal
                tingkatanData={tingkatanSelectData}
                kelasData={kelasSelectData}
                hariData={hariSelectData}
              />
            )}
          </>
        )}

        <Button ml={"12px"} onClick={handleReset}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={"4px"}>
            <SyncIcon />
            <Typography
              fontWeight={"600"}
              fontSize={"13px"}
              color={"primary.main"}
            >
              Reset
            </Typography>
          </Stack>
        </Button>
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"end"}
        alignItems={"center"}
        gap={2}
      >
        <JadwalKeseluruhanSwitch />
        {isJadwalKeseluruhan === "true" ? (
          <AddJadwalKelasModal />
        ) : (
          <AddAktivitasNonKbmModal />
        )}
      </Stack>
    </Stack>
  );
}

export default JadwalKeseluruhanFilters;
