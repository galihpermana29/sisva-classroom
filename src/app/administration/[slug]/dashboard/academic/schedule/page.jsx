import { Box, Divider, Paper, Stack } from "@mui/material";
import { BobotSKS } from "./components/BobotSKS";
import { TabsSelector } from "./components/TabSelector";
import { Suspense } from "react";

const DEFAULT_TAB = 0;

const DashboardAcademic = ({ searchParams }) => {
  const { tab } = searchParams;
  const activeTab = tab ?? DEFAULT_TAB;

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
          <TabsSelector tabs={tabs} fallback={DEFAULT_TAB} />
        </Suspense>

        <Divider />

        <Suspense>
          <Box sx={{ flex: 1, paddingX: 4, paddingY: 3, overflowY: "hidden" }}>
            {tabs[activeTab].component}
          </Box>
        </Suspense>
      </Stack>

      {tabs[activeTab].extras ? (
        <Suspense>{tabs[activeTab].extras}</Suspense>
      ) : null}
    </Stack>
  );
};

const tabs = [
  {
    title: "Pengaturan Jadwal",
    component: <div>Pengaturan Jadwal</div>,
    extras: <BobotSKS />,
  },
  {
    title: "Jadwal Keseluruhan",
    component: <div>Jadwal Keseluruhan</div>,
  },
  {
    title: "Jadwal Kelas",
    component: <div>Jadwal Kelas</div>,
  },
  {
    title: "Jadwal Guru",
    component: <div>Jadwal Guru</div>,
  },
];

export default DashboardAcademic;
