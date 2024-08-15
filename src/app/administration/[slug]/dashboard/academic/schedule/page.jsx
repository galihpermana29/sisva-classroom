import { Divider, Paper, Stack } from "@mui/material";
import { BobotSKS } from "./components/BobotSKS";
import { TabsSelector } from "./components/TabSelector";
import { Suspense } from "react";
import { PengaturanJadwal } from "./components/tabs/PengaturanJadwal";
import { JadwalKelas } from "./components/tabs/JadwalKelas";
import { JadwalGuru } from "./components/tabs/JadwalGuru";

const DEFAULT_TAB = 0;

const DashboardAcademic = ({ searchParams }) => {
  const { tab } = searchParams;

  // check whether tab search params exists (not null),
  // and checks whether the current tab is valid (tabs[tab] exists)
  const activeTab = tab && Boolean(tabs[tab]) ? tab : DEFAULT_TAB;

  return (
    <Stack gap={3}>
      <Stack
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 2,
          flex: 1,
          overflowY: "hidden",
          maxHeight: "100%",
        }}
      >
        <Suspense>
          <TabsSelector
            tabs={tabs}
            activeTab={activeTab}
          />
        </Suspense>

        <Divider />

        <Suspense>{tabs[activeTab].component}</Suspense>
      </Stack>

      <Suspense>{tabs[activeTab].extras}</Suspense>
    </Stack>
  );
};

const tabs = [
  {
    title: "Pengaturan Jadwal",
    component: <PengaturanJadwal />,
    extras: <BobotSKS />,
  },
  {
    title: "Jadwal Keseluruhan",
    component: <div>Jadwal Keseluruhan</div>,
  },
  {
    title: "Jadwal Kelas",
    component: <JadwalKelas />,
  },
  {
    title: "Jadwal Guru",
    component: <JadwalGuru />,
  },
];

export default DashboardAcademic;
