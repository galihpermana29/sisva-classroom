"use client";

import TeachingMaterialTabs from "@/app/classroom/shared/presentation/RppTeachingMaterial/TeachingMaterialTabs";
import Tabs from "@/app/classroom/shared/presentation/Tabs/Tabs";
import { useMediaQuery } from "@/app/classroom/shared/usecase/hooks/use-mediaquery";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useSearchParams } from "next/navigation";
import AssignmentPane from "../../../Pane/Assignments";
import TeachingPlanPane from "../../../Pane/TeachingPlan";
import TableAttendances from "../Pane/Attendance/TableAttendance";
import TableScore from "../Pane/Score/TableScore";

const ClassDetailTabs = ({ initialData }) => {
  const searchParams = useSearchParams();
  const { updateQueryParam } = useQueryParam();
  const isAboveMobile = useMediaQuery("(min-width: 768px)");

  const selectedTab = searchParams.get("tab");

  const classDetailTabList = [
    {
      key: "rencana_pembelajaran",
      label: "Rencana Pembelajaran",
      children: <TeachingPlanPane />,
    },
    {
      key: "bahan_ajar",
      label: "Bahan Ajar",
      children: (
        <TeachingMaterialTabs initialData={initialData} type="teacher" />
      ),
    },
    {
      key: "tugas",
      label: "Tugas",
      children: <AssignmentPane />,
    },
    {
      key: "nilai",
      label: "Nilai",
      children: (
        <div>
          <h1 className="mb-5 text-base font-bold text-base90">
            List Nilai Siswa
          </h1>
          <TableScore />
        </div>
      ),
    },
    {
      key: "kehadiran",
      label: "Kehadiran",
      children: <TableAttendances />,
    },
  ];

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
