"use client";

import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GuruSelect } from "../GuruSelect";
import { HariSelect } from "../HariSelect";
import { KelasSelect } from "../KelasSelect";
import { PERIODE_FIELD_NAME, PeriodeSelect } from "../PeriodeSelect";
import { PRODI_FIELD_NAME, ProdiSelect } from "../ProdiSelect";
import { TingkatSelect } from "../TingkatSelect";
import { JadwalKeseluruhanSwitch } from "../JadwalKeseluruhanSwitch";
import AddJadwalKelasModal from "../../modals/AddJadwalKelasModal";

function JadwalKeseluruhanFilters() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);

  const showProdi = Boolean(periode);
  const showTingkat = Boolean(prodi);

  const pathName = usePathname();
  const router = useRouter();
  const handleReset = () => router.push(`${pathName}?tab=${tab}`);

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <PeriodeSelect />
        {showProdi && <ProdiSelect />}
        {showProdi && showTingkat && (
          <>
            <TingkatSelect />
            <KelasSelect />
            <HariSelect />
            <GuruSelect />
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
      <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
        <JadwalKeseluruhanSwitch />
        <AddJadwalKelasModal />
      </Stack>
    </Stack>
  );
}

export default JadwalKeseluruhanFilters;
