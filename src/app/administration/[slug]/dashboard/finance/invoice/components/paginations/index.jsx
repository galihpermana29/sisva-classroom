"use client";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { usePagination } from "../../hooks/usePagination";
import { PaginationButton } from "./PaginationButton";
import { RowsPerPage } from "./RowsPerPage";

export const Paginations = ({ totalPage, withRowSetting = true }) => {
  const { page, goToPrevPage, goToNextPage } = usePagination();

  const isAbleToGoBack = page > 1;
  const isAbleToGoNext = page < totalPage;

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      {withRowSetting && <RowsPerPage />}
      <Stack
        width={{ xs: "100%", lg: withRowSetting ? "auto" : "100%" }}
        flexDirection="row"
        gap={2}
        alignItems="center"
        justifyContent={{
          xs: "space-between",
          lg: withRowSetting ? "center" : "end",
        }}
      >
        <PaginationButton
          text="Previous"
          disabled={!isAbleToGoBack}
          startIcon={<ArrowBack fontSize="small" />}
          onClick={goToPrevPage}
        />
        <Typography variant="body2">
          Halaman {page} dari {totalPage}
        </Typography>
        <PaginationButton
          text="Next"
          disabled={!isAbleToGoNext}
          endIcon={<ArrowForward fontSize="small" />}
          onClick={goToNextPage}
        />
      </Stack>
    </Stack>
  );
};
