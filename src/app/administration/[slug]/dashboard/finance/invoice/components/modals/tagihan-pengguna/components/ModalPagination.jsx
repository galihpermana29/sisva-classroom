import { Stack, Typography } from "@mui/material";
import { PaginationButton } from "../../../paginations/PaginationButton";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const ModalPagination = ({ page, totalPage, setPage }) => {
  const goToNextPage = () => setPage((prev) => prev + 1);
  const goToPrevPage = () => setPage((prev) => prev - 1);

  const isAbleToGoBack = page > 1;
  const isAbleToGoNext = page < totalPage;

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <Stack
        width="100%"
        flexDirection="row"
        gap={2}
        alignItems="center"
        justifyContent={{
          xs: "space-between",
          lg: "end",
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
