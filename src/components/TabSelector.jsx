"use client";

import { useQueryParam } from "@/hooks/useQueryParam";
import { Button, Stack, Typography } from "@mui/material";

export const TAB_FIELD_NAME = "tab";

export const TabsSelector = ({ tabs, activeTab, onChange }) => {
  const { updateQueryParam } = useQueryParam();
  const handleChange = (value) => updateQueryParam(TAB_FIELD_NAME, value);
  const changeTab = onChange ?? handleChange;

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
