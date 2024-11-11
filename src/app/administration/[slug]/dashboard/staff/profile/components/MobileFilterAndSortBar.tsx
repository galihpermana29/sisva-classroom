import { SortIcon } from "@/assets/SVGs";
import { Button, Divider, Stack } from "@mui/material";
import { memo } from "react";
import Filters from "./Filters";

function MobileFilterAndSortBar({ setOpenSortModal }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        px: 2,
        height: 54,
        mb: 1,
        display: { xs: "flex", lg: "none" },
      }}
    >
      <Filters />
      <Stack sx={{ flexDirection: "row", py: 1 }}>
        <Divider orientation="vertical" sx={{ mx: 1 }} />
        <Button
          sx={{
            backgroundColor: "base.base30",
            color: "base.base50",
            fontSize: 18,
            "&:hover": {
              backgroundColor: "base.base40",
            },
          }}
          onClick={() => {
            setOpenSortModal(true);
          }}
        >
          <SortIcon />
        </Button>
      </Stack>
    </Stack>
  );
}

export default memo(MobileFilterAndSortBar);
