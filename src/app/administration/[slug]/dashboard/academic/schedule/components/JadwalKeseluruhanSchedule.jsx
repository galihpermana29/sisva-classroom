"use client";

import { useState } from "react";
import useJadwalKeseluruhanCalendar from "../hooks/useJadwalKeseluruhanCalendar";
import EditAktivitasNonKbmModal from "./modals/EditAktivitasNonKbmModal";
import TimelineWeekSchedule from "./TimelineWeekSchedule";
import dayjs from "dayjs";
import EditJadwalKelasModal from "./modals/EditJadwalKelasModal";

const formatDateTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const JadwalKeseluruhanSchedule = ({}) => {
  const { data, studentGroupData } = useJadwalKeseluruhanCalendar();

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

  return (
    <>
      <TimelineWeekSchedule
        data={data}
        classData={studentGroupData}
        onEventClick={onEventClick}
      />
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
