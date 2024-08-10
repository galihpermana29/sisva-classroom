"use client";

import AcademicAPI from "@/api/academic";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddAktivitasNonKbmModal from "../../modals/AddAktivitasNonKbmModal";
import AddJadwalKelasModal from "../../modals/AddJadwalKelasModal";
import JadwalKeseluruhanOptionalFiltersModal from "../JadwalKeseluruhanOptionalFiltersModal";
import {
  JADWAL_KESELURUHAN_FIELD_NAME,
  JadwalKeseluruhanSwitch,
} from "../JadwalKeseluruhanSwitch";
import { PERIODE_FIELD_NAME, PeriodeSelect } from "../PeriodeSelect";
import { PRODI_FIELD_NAME, ProdiSelect } from "../ProdiSelect";
import useJadwalKeseluruhanFilter from "../../../hooks/useJadwalKeseluruhanFilter";

function JadwalKeseluruhanFilters() {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const jadwalKeseluruhan =
    searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";

  const showProdi = Boolean(periode);
  const showOptionalFilters = Boolean(prodi);

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
        {jadwalKeseluruhan === "true" && showProdi && (
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
            <Box position={"relative"} width={"10px"} height={"10px"}>
              <Image
                src={"/images/reset-icon-blue.svg"}
                fill
                alt="Reset Icon"
              />
            </Box>
            <Typography fontWeight={"600"} fontSize={"13px"} color={"#008CD5"}>
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
        {jadwalKeseluruhan === "true" ? (
          <AddJadwalKelasModal />
        ) : (
          <AddAktivitasNonKbmModal />
        )}
      </Stack>
    </Stack>
  );
}

export default JadwalKeseluruhanFilters;
