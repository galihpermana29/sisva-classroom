import { useQueryParam } from "@/hooks/useQueryParam";
import { Stack, Switch, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export const JADWAL_KESELURUHAN_FIELD_NAME = "jadwal_keseluruhan";

export const JadwalKeseluruhanSwitch = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";

  const { updateQueryParam } = useQueryParam();
  const handleChange = (event) =>
    updateQueryParam(
      JADWAL_KESELURUHAN_FIELD_NAME,
      event.target.checked.toString()
    );

  return (
    <Stack flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
      <Switch checked={value === "true"} onChange={handleChange} />
      <Typography fontWeight={"600"} fontSize={"13px"} color={"#98A2B3"}>
        Jadwal Keseluruhan
      </Typography>
    </Stack>
  );
};
