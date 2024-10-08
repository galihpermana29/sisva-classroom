"use client";

import Tabs from "src/app/classroom/shared/presentation/Tabs/Tabs";
import TeachingPlanPane from "../Pane/TeachingPlan/TeachingPlan";
import TeachingMaterialTabs from "@/app/classroom/(main)/teacher/class/[classId]/view/container/Tabs/TeachingMaterialTabs";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/app/classroom/shared/usecase/hooks/use-mediaquery";

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
    children: <TeachingPlanPane />,
  },
  {
    key: "bahan_ajar",
    label: "Bahan Ajar",
    children: <TeachingMaterialTabs />,
  },
  {
    key: "tugas",
    label: "Tugas",
    children: <div></div>,
  },
  {
    key: "nilai",
    label: "Nilai",
    children: <div></div>,
  },
  {
    key: "kehadiran",
    label: "Kehadiran",
    children: <div></div>,
  },
];
