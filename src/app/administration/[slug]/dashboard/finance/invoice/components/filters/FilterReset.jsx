"use client";

import { useTheme } from "@emotion/react";
import { Button, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ResetIcon from "../icons/ResetIcon";

function FilterReset() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();

  const tab = searchParams.get("tab") ?? 0;

  const handleResetFilters = () => {
    router.push(`${pathName}?tab=${tab}`);
  };

  return (
    <Button onClick={handleResetFilters}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={"4px"}>
        <ResetIcon color={theme.palette.primary.main} />
        <Typography fontWeight={"600"} fontSize={"13px"} color={"primary.main"}>
          Reset
        </Typography>
      </Stack>
    </Button>
  );
}

export default FilterReset;
