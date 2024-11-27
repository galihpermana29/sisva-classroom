"use client";

import SyncIcon from "@mui/icons-material/Sync";
import { Button, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterReset() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") ?? 0;

  const handleResetFilters = () => {
    router.push(`${pathName}?tab=${tab}`);
  };

  return (
    <Button onClick={handleResetFilters}>
      <Stack flexDirection={"row"} alignItems={"center"} gap={"4px"}>
        <SyncIcon />
        <Typography fontWeight={"600"} fontSize={"13px"} color={"primary.main"}>
          Reset
        </Typography>
      </Stack>
    </Button>
  );
}

export default FilterReset;
