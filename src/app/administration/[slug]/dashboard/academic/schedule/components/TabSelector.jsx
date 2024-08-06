"use client";

import { useActiveTab } from "@/hooks/useActiveTab";
import { Button, Stack, Typography } from "@mui/material";

export const TabsSelector = ({ tabs, fallback }) => {
  const { activeTab, changeTab } = useActiveTab(fallback);
  return (
    <Stack
      gap={2}
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
              p: { xs: "16px 8px", lg: 2 },
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
