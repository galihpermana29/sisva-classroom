import { Stack, Switch, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { useQueryParam } from "@/hooks/useQueryParam";

import { PRODI_FIELD_NAME } from "./ProdiSelect";

export const JADWAL_KESELURUHAN_FIELD_NAME = "jadwal_keseluruhan";

export const JadwalKeseluruhanSwitch = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";
  const prodiValue = searchParams.get(PRODI_FIELD_NAME) ?? "";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    updateQueryParam({
      [JADWAL_KESELURUHAN_FIELD_NAME]: isChecked.toString(),
      [PRODI_FIELD_NAME]: isChecked ? prodiValue : "",
    });
  };

  return (
    <Stack flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
      <Switch checked={value === "true"} onChange={handleChange} />
      <Typography fontWeight={"600"} fontSize={"13px"} color={"#98A2B3"}>
        Jadwal Keseluruhan
      </Typography>
    </Stack>
  );
};
