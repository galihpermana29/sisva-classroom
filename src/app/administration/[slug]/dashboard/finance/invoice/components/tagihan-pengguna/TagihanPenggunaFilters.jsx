import { Divider, Stack } from "@mui/material";

import { DateRangeSelect } from "../filters/DateRangeSelect";
import { TagihanPenggunaKategoriFilter } from "../filters/tagihan-pengguna/TagihanPenggunaKategoriFilter";
import FilterReset from "../filters/FilterReset";
import { TagihanPenggunaSort } from "./TagihanPenggunaSort";

/** @description Component for handling tagihan pengguna tab's filters */
export const TagihanPenggunaFilters = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      <TagihanPenggunaSort />
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
          <TagihanPenggunaKategoriFilter />
          <FilterReset />
        </Stack>
      </Stack>
    </Stack>
  );
};
