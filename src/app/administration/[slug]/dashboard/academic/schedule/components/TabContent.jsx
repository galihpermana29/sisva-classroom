"use client";

import { useActiveTab } from "@/hooks/useActiveTab";
import { Box } from "@mui/material";

export const TabContent = ({ tabs, fallback }) => {
  const { activeTab } = useActiveTab(fallback);
  return (
    <Box sx={{ flex: 1, paddingX: 4, paddingY: 3, overflowY: "hidden" }}>
      {tabs[activeTab].component}
    </Box>
  );
};
