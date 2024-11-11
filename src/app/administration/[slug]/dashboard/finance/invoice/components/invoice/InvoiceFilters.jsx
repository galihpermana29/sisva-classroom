import { Divider, Stack } from "@mui/material";
import { DateRangeSelect } from "../filters/DateRangeSelect";
import FilterReset from "../filters/FilterReset";
import { StatusSelect } from "../filters/StatusSelect";
import { InvoiceKategoriFilter } from "../filters/invoice/InvoiceKategoriFilter";
import { InvoiceSort } from "./InvoiceSort";

/** @description Component for handling invoice tab's filters */
export const InvoiceFilters = () => {
  return (
    <Stack className="no-scrollbar" sx={{ overflow: "hidden" }}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <InvoiceSort />
        <Divider
          orientation="vertical"
          sx={{ height: 36.5, display: { xs: "block", lg: "none" } }}
        />
        <Stack sx={{ overflowX: "auto", width: { md: "100%" } }}>
          <Stack
            className="min-w-max overflow-y-hidden"
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
    </Stack>
  );
};
