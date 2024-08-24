"use client";

import { Typography } from "@mui/material";
import { useActiveInvoiceTab } from "../../hooks/useActiveInvoiceTab";

/** @description Component for top level invoice layout title */
export const TabLayoutTitle = () => {
  const {
    activeIndex,
    activeTab: { title },
  } = useActiveInvoiceTab();

  return (
    <Typography
      key={`tab-layout-title-${activeIndex}`}
      display={{ xs: "none", lg: "block" }}
      fontWeight={600}
      fontSize={20}
      lineHeight="120%"
    >
      {title}
    </Typography>
  );
};
