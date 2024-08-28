"use client";

import { useState } from "react";
import useJadwalKeseluruhanCalendar from "../hooks/useJadwalKeseluruhanCalendar";
import EditAktivitasNonKbmModal from "./modals/EditAktivitasNonKbmModal";
import TimelineWeekSchedule from "./TimelineWeekSchedule";
import dayjs from "dayjs";
import EditJadwalKelasModal from "./modals/EditJadwalKelasModal";

export const JadwalKeseluruhanSchedule = () => {
  const {
    data,
    studentGroupData,
    isLoading,
    periode,
    prodi,
    isJadwalKeseluruhan,
    workDays,
    scheduleStartTime,
    scheduleEndTime,
  } = useJadwalKeseluruhanCalendar();

  const [openEditNonKbm, setOpenEditNonKbm] = useState(false);
  const [openEditJadwalKelas, setOpenEditJadwalKelas] = useState(false);
  const [initialEditData, setInitialEditData] = useState();

  const handleOpenEditNonKbm = () => setOpenEditNonKbm(true);
  const handleCloseEditNonKbm = () => setOpenEditNonKbm(false);

  const handleOpenEditJadwalKelas = () => setOpenEditJadwalKelas(true);
  const handleCloseEditJadwalKelas = () => setOpenEditJadwalKelas(false);

  const onEventClick = (args) => {
    args.cancel = true;

    if (args.event.type === "learning") handleOpenEditJadwalKelas();
    else handleOpenEditNonKbm();

    const parsedData = {
      ...args.event,
      start_time: dayjs(args.event.start_time),
      end_time: dayjs(args.event.end_time),
    };

    setInitialEditData(parsedData);
  };

  const emptyState = (
    <iframe
      src="https://lottie.host/embed/b5db43dc-864b-4e2d-8ad1-042536dbe95b/O1cPFK7CcS.json"
      className="border-none w-full h-[238px]"
    ></iframe>
  );

  const isStudentGroupDataEmpty = studentGroupData?.length === 0;
  const isPeriodeInvalid = parseInt(periode) === -1;
  const isProdiInvalid = parseInt(prodi) === -1;

  if (isJadwalKeseluruhan === "true") {
    if (isStudentGroupDataEmpty || isPeriodeInvalid || isProdiInvalid)
      return emptyState;
  } else {
    if (isStudentGroupDataEmpty || isPeriodeInvalid) return emptyState;
  }

  return (
    <>
      {!isLoading ? (
        <TimelineWeekSchedule
          data={data}
          classData={studentGroupData}
          onEventClick={onEventClick}
          workDays={workDays}
          startTime={scheduleStartTime}
          endTime={scheduleEndTime}
        />
      ) : (
        <div className="h-[650px] w-full animate-pulse bg-gray-200" />
      )}
      <EditAktivitasNonKbmModal
        open={openEditNonKbm}
        handleClose={handleCloseEditNonKbm}
        data={initialEditData}
      />
      <EditJadwalKelasModal
        open={openEditJadwalKelas}
        handleClose={handleCloseEditJadwalKelas}
        data={initialEditData}
      />
    </>
  );
};
