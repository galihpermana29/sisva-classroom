"use client";

import Tabs from "@/app/classroom/shared/presentation/Tabs/Tabs";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/app/classroom/shared/usecase/hooks/use-mediaquery";
import TableScore from "../Pane/Score/TableScore";
import TableAttendances from "../Pane/Attendance/TableAttendance";

const ClassDetailTabs = () => {
  const searchParams = useSearchParams();
  const { updateQueryParam } = useQueryParam();
  const isAboveMobile = useMediaQuery("(min-width: 768px)");

  const selectedTab = searchParams.get("tab");

  return (
    <Tabs
      defaultActiveKey={selectedTab || "rencana_pembelajaran"}
      tabList={classDetailTabList}
      centered={isAboveMobile}
      tabPosition="top"
      onChange={(key) => {
        updateQueryParam("tab", key);
      }}
    />
  );
};

export default ClassDetailTabs;

const classDetailTabList = [
  {
    key: "rencana_pembelajaran",
    label: "Rencana Pembelajaran",
    children: <div></div>,
  },
  {
    key: "bahan_ajar",
    label: "Bahan Ajar",
    children: <div></div>,
  },
  {
    key: "tugas",
    label: "Tugas",
    children: <div></div>,
  },
  {
    key: "nilai",
    label: "Nilai",
    children: (
      <div>
        <h1 className="text-base text-base90 font-bold mb-6 ">
          List Nilai Siswa
        </h1>
        <TableScore />
      </div>
    ),
  },
  {
    key: "kehadiran",
    label: "Kehadiran",
    children: (
      <div>
        <h1 className="text-base text-base90 font-bold mb-6 ">
          List Kehadiran Siswa
        </h1>
        <TableAttendances />
      </div>
    ),
  },
];
