import { SortIcon } from "@/assets/SVGs";
import { KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack } from "@mui/material";

/** @description Component for handling tagihan pengguna tab's filters */
export const TagihanPenggunaFilters = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      <Button
        fullWidth
        variant="outlined"
        className="flex justify-between"
        startIcon={<SortIcon />}
        endIcon={<KeyboardArrowDown />}
      >
        <span className="mr-auto">Urutkan</span>
      </Button>
      <Divider
        orientation="vertical"
        sx={{ height: 36.5 }}
      />
      <IconButton sx={{ borderRadius: 2 }}>
        <Tune color="primary" />
      </IconButton>
    </Stack>
  );
};
