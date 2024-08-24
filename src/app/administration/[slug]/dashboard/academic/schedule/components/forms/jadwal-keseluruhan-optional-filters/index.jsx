import { useQueryParam } from "@/hooks/useQueryParam";
import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { KELAS_FIELD_NAME } from "../../filters/KelasSelect";
import { TINGKAT_FIELD_NAME } from "../../filters/TingkatSelect";
import FilterClassSelect from "../../form-items/jadwal-keseluruhan-filters/FilterClassSelect";
import FilterDaySelect from "../../form-items/jadwal-keseluruhan-filters/FilterDaySelect";
import FilterLevelSelect from "../../form-items/jadwal-keseluruhan-filters/FlterLevelSelect";

function JadwalKeseluruhanOptionalFilterForm({
  handleClose,
  initialValues,
  tingkatanData,
  kelasData,
  hariData,
}) {
  const searchParams = useSearchParams();
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);
  const kelas = searchParams.get(KELAS_FIELD_NAME);

  const { updateQueryParam } = useQueryParam();

  const formik = useFormik({
    initialValues: initialValues ?? {
      tingkat: "",
      kelas: "",
      hari: "",
    },
    onSubmit: (values) => {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );

      Object.keys(filteredValues).forEach((key) => {
        updateQueryParam(key, filteredValues[key]);
      });

      handleClose();
    },
  });
  return (
    <form
      className="flex flex-col gap-6 max-h-[75vh] overflow-auto"
      onSubmit={formik.handleSubmit}
    >
      <Stack gap={2}>
        <FilterLevelSelect
          formik={formik}
          label={"Tingkatan"}
          name={"tingkat"}
          placeholder={"Pilih tingkatan"}
          data={tingkatanData}
        />
        <FilterClassSelect
          // disabled={!Boolean(tingkat)}
          formik={formik}
          label={"Kelas"}
          name={"kelas"}
          placeholder={"Pilih kelas"}
          data={kelasData}
        />
        <FilterDaySelect
          // disabled={!Boolean(kelas)}
          formik={formik}
          label={"Hari"}
          name={"hari"}
          placeholder={"Pilih hari"}
          data={hariData}
        />
      </Stack>
      <Stack flexDirection="row" gap={2}>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={handleClose}
        >
          Batal
        </Button>
        <Button type="submit" fullWidth variant="contained">
          Atur
        </Button>
      </Stack>
    </form>
  );
}

export default JadwalKeseluruhanOptionalFilterForm;
