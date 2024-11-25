"use client";

import { Button, Stack, Typography } from "@mui/material";

import { useQueryParam } from "@/hooks/useQueryParam";

import { JADWAL_KESELURUHAN_FIELD_NAME } from "./filters/JadwalKeseluruhanSwitch";
import { KELAS_FIELD_NAME } from "./filters/KelasSelect";
import { PRODI_FIELD_NAME } from "./filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "./filters/TingkatSelect";

export const TAB_FIELD_NAME = "tab";

export const TabsSelector = ({ tabs, activeTab }) => {
  const { updateQueryParam } = useQueryParam();
  const changeTab = (value) => {
    // if tab is Jadwal Keseluruhan
    if (value === 1) {
      updateQueryParam({
        [TAB_FIELD_NAME]: value,
        [TINGKAT_FIELD_NAME]: "",
        [PRODI_FIELD_NAME]: "",
        [KELAS_FIELD_NAME]: "",
        [JADWAL_KESELURUHAN_FIELD_NAME]: "true",
      });
    } else {
      updateQueryParam(TAB_FIELD_NAME, value);
    }
  };

  return (
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
            key={`${item.title}${index}`}
            sx={{
              p: { xs: "16px 24px", lg: 2 },
              minWidth: "fit-content",
              flex: { xs: 1, lg: 0 },
              borderBottom: "2px solid",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderColor:
                parseInt(activeTab) === index ? "primary.main" : "transparent",
            }}
            onClick={() => changeTab(index)}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
              {item.title}
            </Typography>
          </Button>
        );
      })}
    </Stack>
  );
};
