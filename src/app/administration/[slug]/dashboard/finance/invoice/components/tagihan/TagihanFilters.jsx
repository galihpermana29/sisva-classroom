import { SortIcon } from "@/assets/SVGs";
import { KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack } from "@mui/material";
import { DateRangeSelect } from "../filters/DateRangeSelect";
import FilterReset from "../filters/FilterReset";
import { KategoriSelect } from "../filters/KategoriSelect";
import { StatusSelect } from "../filters/StatusSelect";

const statusFilters = [
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Published",
    value: "published",
  },
];

/** @description Component for handling tagihan tab's filters */
export const TagihanFilters = () => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      <Button
        fullWidth
        variant="outlined"
        className="flex justify-between lg:hidden"
        startIcon={<SortIcon />}
        endIcon={<KeyboardArrowDown />}
      >
        <span className="mr-auto">Urutkan</span>
      </Button>
      <Divider
        orientation="vertical"
        sx={{ height: 36.5, display: { xs: "block", lg: "none" } }}
      />
      <IconButton
        sx={{ borderRadius: 2, display: { xs: "block", lg: "none" } }}
      >
        <Tune color="primary" />
      </IconButton>
      <Stack
        display={{ xs: "none", lg: "flex" }}
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        <DateRangeSelect />
        <KategoriSelect data={statusFilters} />
        <StatusSelect data={statusFilters} />
        <FilterReset />
      </Stack>
    </Stack>
  );
};
