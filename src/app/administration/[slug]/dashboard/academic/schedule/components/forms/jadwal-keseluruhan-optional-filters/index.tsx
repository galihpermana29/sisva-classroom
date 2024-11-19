import { Button, Stack } from "@mui/material";
import FilterClassSelect from "../../form-items/jadwal-keseluruhan-filters/FilterClassSelect";
import FilterDaySelect from "../../form-items/jadwal-keseluruhan-filters/FilterDaySelect";
import FilterLevelSelect from "../../form-items/jadwal-keseluruhan-filters/FlterLevelSelect";

function JadwalKeseluruhanOptionalFilterForm({
  handleClose,
  tingkatanData,
  kelasData,
  hariData,
}) {
  return (
    <div className="flex flex-col gap-6 max-h-[75vh] overflow-auto">
      <Stack gap={2}>
        <FilterLevelSelect
          label={"Tingkatan"}
          name={"tingkat"}
          placeholder={"Pilih tingkatan"}
          data={tingkatanData}
        />
        <FilterClassSelect
          label={"Kelas"}
          name={"kelas"}
          placeholder={"Pilih kelas"}
          data={kelasData}
        />
        <FilterDaySelect
          label={"Hari"}
          name={"hari"}
          placeholder={"Pilih hari"}
          data={hariData}
        />
      </Stack>
      <Stack flexDirection="row" gap={2}>
        <Button onClick={handleClose} fullWidth variant="contained">
          Selesai
        </Button>
      </Stack>
    </div>
  );
}

export default JadwalKeseluruhanOptionalFilterForm;
