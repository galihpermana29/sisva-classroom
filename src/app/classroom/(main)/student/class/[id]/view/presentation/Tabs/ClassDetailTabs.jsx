"use client";

import Tabs from "@/app/classroom/shared/presentation/Tabs/Tabs";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/app/classroom/shared/usecase/hooks/use-mediaquery";
import TableScore from "../Pane/Score/TableScore";
import TeachingPlanPane from "../../../Pane/TeachingPlan";
import AssignmentPane from "../../../Pane/Assignments";
import TeachingMaterialTabs from "@/app/classroom/shared/presentation/RppTeachingMaterial/TeachingMaterialTabs";

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
        <TeachingMaterialTabs initialData={initialData} type="student" />
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
          <h1 className="mb-6 text-base font-bold text-base90 ">
            List Nilai Siswa
          </h1>
          <TableScore />
        </div>
      ),
    },
    {
      key: "kehadiran",
      label: "Kehadiran",
      children: <div></div>,
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
