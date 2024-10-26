import { timeStringToDayjs } from "@/utils/formatTimeString";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import * as yup from "yup";
dayjs.extend(isoWeek);

export const getEditJamSekolahSchema = ({
  periode,
  prodi,
  tingkat,
  initials,
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
    status: yup
      .string("Harap masukkan status yang valid!")
      .required("Wajib mengisi status!")
      .default(initials.status)
      .test(
        "status-validation",
        "Validating status change",
        function (value, context) {
          const { day } = context.parent;
          const isToday = day === dayjs().isoWeekday();

          // cannot change status to inactive if status is already changeds
          if (initials.status !== "inactive" && value === "inactive") {
            return context.createError({
              path: "status",
              message: "Jadwal tidak dapat diganti menjadi tidak aktif!",
            });
          }

          if (initials.status === "inactive" && value === "finished") {
            return context.createError({
              path: "status",
              message:
                "Harap ubah status jadwal menjadi aktif terlebih dahulu.",
            });
          }

          if (initials.status === "inactive" && value === "active") {
            const activeDayAlreadyExist = scheduleData.some(
              (schedule) => schedule.day === day
            );

            if (activeDayAlreadyExist) {
              return context.createError({
                path: "status",
                message: "Sudah terdapat jadwal aktif dengan hari yang sama!",
              });
            }
          }

          if (isToday) {
            // cannot change status to active before start time
            if (initials.status === "inactive" && value === "active") {
              const nowIsBeforeStartTime = dayjs().isBefore(
                timeStringToDayjs(context.parent.start_time),
                "hour"
              );

              if (nowIsBeforeStartTime)
                return context.createError({
                  path: "status",
                  message: "Belum memasuki waktu mulai jadwal!",
                });
            }

            // cannot change status to finished before end time
            if (initials.status === "active" && value === "finished") {
              const nowIsBeforeEndTime = dayjs().isBefore(
                timeStringToDayjs(context.parent.end_time),
                "hour"
              );

              if (nowIsBeforeEndTime) {
                return context.createError({
                  path: "status",
                  message: "Belum memasuki waktu berakhirnya jadwal!",
                });
              }
            }
          }

          return true;
        }
      ),
    day: yup
      .number("Harap masukkan hari yang valid!")
      .min(0, { message: "Harap masukkan hari yang valid!" })
      .required("Wajib mengisi hari!")
      .default(initials.day)
      .test(
        "day-validation",
        "Validasi hari apa saja yang sudah ada pada jadwal",
        function (value, context) {
          if (
            initials.day !== value &&
            scheduleData.some((schedule) => schedule.day === value)
          ) {
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
      .default(initials.start_time),
    end_time: yup
      .string("Wajib mengisi waktu berakhir!")
      .required("Wajib mengisi waktu berakhir!")
      .default(initials.end_time)
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
