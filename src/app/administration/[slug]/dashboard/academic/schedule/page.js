"use client";

import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

const DashboardAcademic = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [studyProgramFilter, setStudyProgramFilter] = useState("");

  let tabs = [
    {
      title: "Pengaturan Jadwal",
      component: <div>Pengaturan Jadwal</div>,
    },
    {
      title: "Jadwal Keseluruhan",
      component: <div>Jadwal Keseluruhan</div>,
    },
    {
      title: "Jadwal Kelas Pilihan",
      component: <div>Jadwal Kelas Pilihan</div>,
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

  return (
    <Stack gap={3} className="p-8">
      <Typography fontWeight={600} fontSize={24} lineHeight="120%">
        Jadwal Pelajaran
      </Typography>

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
        <Stack
          sx={{
            flexDirection: "row",
            borderBottom: "1px solid rgb(0,0,0,0.12)",
            overflowX: "auto",
          }}
        >
          {tabs.map((item, index) => {
            return (
              <Button
                key={index}
                sx={{
                  p: { xs: "16px 8px", lg: 2 },
                  minWidth: 140,
                  flex: { xs: 1, lg: 0 },
                  borderBottom: "2px solid",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor:
                    activeTab === index ? "primary.main" : "transparent",
                }}
                onClick={() => {
                  setActiveTab(index);
                  setStudyProgramFilter("");
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {item.title}
                </Typography>
              </Button>
            );
          })}
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, paddingX: 4, paddingY: 3, overflowY: "hidden" }}>
          {tabs[activeTab].component}
        </Box>
      </Stack>
    </Stack>
  );
};

export default DashboardAcademic;
