import TeachingMaterialTabs from "@/app/classroom/(main)/teacher/class/[slug]/view/container/Tabs/TeachingMaterialTabs";
import Tabs from "./Tabs";

const ClassDetailTabs = () => {
  return (
    <Tabs
      defaultActiveKey="rencana_pembelajaran"
      tabList={classDetailTabList}
      centered={true}
      tabPosition="top"
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
