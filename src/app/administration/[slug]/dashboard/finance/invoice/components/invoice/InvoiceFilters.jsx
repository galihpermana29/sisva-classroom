import { SortIcon } from "@/assets/SVGs";
import { KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack } from "@mui/material";
import { DateRangeSelect } from "../filters/DateRangeSelect";
import { StatusSelect } from "../filters/StatusSelect";
import { InvoiceKategoriFilter } from "../filters/invoice/InvoiceKategoriFilter";
import FilterReset from "../filters/FilterReset";

/** @description Component for handling invoice tab's filters */
export const InvoiceFilters = () => {
  return (
    <Stack
      className="no-scrollbar"
      sx={{ overflowX: "auto", overflowY: "hidden" }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        <Button
          fullWidth
          sx={{ display: { xs: "flex", lg: "none" } }}
          variant="outlined"
          startIcon={<SortIcon />}
          endIcon={<KeyboardArrowDown />}
          className="min-w-max"
        >
          <span className="mr-auto">Urutkan</span>
        </Button>
        <Divider
          orientation="vertical"
          sx={{ height: 36.5, display: { xs: "block", lg: "none" } }}
        />
        <Stack
          className="min-w-max overflow-x-auto overflow-y-hidden"
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          <DateRangeSelect />
          <InvoiceKategoriFilter />
          <StatusSelect />
          <FilterReset />
        </Stack>
      </Stack>
    </Stack>
  );
};
