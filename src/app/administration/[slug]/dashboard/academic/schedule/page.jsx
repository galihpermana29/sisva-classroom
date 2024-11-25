import { Divider, Paper, Stack } from "@mui/material";
import { Suspense } from "react";

import { BobotSKS } from "./components/BobotSKS";
import { JadwalGuru } from "./components/tabs/JadwalGuru";
import { JadwalKelas } from "./components/tabs/JadwalKelas";
import JadwalKeseluruhan from "./components/tabs/JadwalKeseluruhan";
import { PengaturanJadwal } from "./components/tabs/PengaturanJadwal";
import { TabsSelector } from "./components/TabSelector";

const DEFAULT_TAB = 0;

export const metadata = {
  title: `Jadwal Pelajaran | Sisva`,
  description: "Sisva | Solusi Digitalisasi dan Modernisasi Sekolah",
};

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
          borderRadius: { xs: 0, lg: 2 },
          flex: 1,
          overflowY: "hidden",
          maxHeight: "100%",
        }}
      >
        <Suspense>
          <TabsSelector tabs={tabs} activeTab={activeTab} />
        </Suspense>

        <Divider sx={{ display: { xs: "none", lg: "block" } }} />

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
    component: <JadwalKeseluruhan />,
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
