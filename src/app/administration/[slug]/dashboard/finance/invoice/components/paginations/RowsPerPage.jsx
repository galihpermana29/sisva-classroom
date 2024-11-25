"use client";

import { useDebouncedCallback } from "@mantine/hooks";
import { Stack, TextField, Typography } from "@mui/material";
import { useCallback } from "react";

import { ROWS_PER_PAGE_NAME } from "../../constants";
import { useInvoiceFilters } from "../../hooks/useInvoiceFilters";
import { usePagination } from "../../hooks/usePagination";

export const RowsPerPage = () => {
  const { rowsPerPage } = usePagination();
  const { updateFilters } = useInvoiceFilters();
  const updateRowsPerPage = useCallback(
    useDebouncedCallback((value) => {
      if (value <= 0) return;
      updateFilters(ROWS_PER_PAGE_NAME, value);
    }, 400),
    [ROWS_PER_PAGE_NAME]
  );

  return (
    <Stack
      display={{ xs: "none", lg: "flex" }}
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      <Typography variant="body2">Rows per page:</Typography>
      <TextField
        onChange={(event) => updateRowsPerPage(event.target.value)}
        defaultValue={rowsPerPage}
        sx={{
          minWidth: "4rem",
          width: "100%",
          maxWidth: "min-content",
        }}
        size="small"
        type="number"
      />
    </Stack>
  );
};
