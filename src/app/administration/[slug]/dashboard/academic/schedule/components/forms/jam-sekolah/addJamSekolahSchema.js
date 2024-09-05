import * as yup from "yup";
import { timeStringToDayjs } from "@/utils/formatTimeString";

export const getAddJamSekolahSchema = ({
  periode,
  prodi,
  tingkat,
  scheduleData,
}) =>
  yup.object({
    period_id: yup
      .number("Harap masukkan periode yang valid!")
      .min(0, { message: "Harap masukkan periode yang valid!" })
      .required("Wajib mengisi periode!")
      .default(periode ? parseInt(periode) : null),
    study_program_id: yup
      .string("Harap masukkan studi program yang valid!")
      .required("Wajib mengisi studi program!")
      .default(prodi ? parseInt(prodi) : null),
    grade: yup
      .string("Harap masukkan tingkatan yang valid!")
      .required("Wajib mengisi tingkatan!")
      .default(tingkat ?? null),
    day: yup
      .number("Harap masukkan hari yang valid!")
      .min(0, { message: "Harap masukkan hari yang valid!" })
      .required("Wajib mengisi hari!")
      .default("")
      .test(
        "day-validation",
        "Validasi hari apa saja yang sudah ada pada jadwal",
        function (value, context) {
          if (scheduleData.some((schedule) => schedule.day === value)) {
            return context.createError({
              path: "day",
              message: "Sudah terdapat jadwal lain pada hari yang Anda pilih!",
            });
          }

          return true;
        }
      ),
    start_time: yup
      .string("Harap masukkan waktu mulai!")
      .required("Wajib mengisi waktu mulai!")
      .default(null),
    end_time: yup
      .string("Wajib mengisi waktu berakhir!")
      .required("Wajib mengisi waktu berakhir!")
      .default(null)
      .test(
        "end_time_later",
        "Waktu berakhir haruslah sebelum waktu mulai!",
        function (value, context) {
          const { start_time } = context.parent;
          return timeStringToDayjs(start_time).isBefore(
            timeStringToDayjs(value),
            "hour"
          );
        }
      ),
  });
