"use client";

import { useSearchParams } from "next/navigation";

import { useQueryParam } from "@/hooks/useQueryParam";

import {
  CURRENT_PAGE_NAME,
  DEFAULT_PAGE,
  DEFAULT_ROWS_PER_PAGE,
  ROWS_PER_PAGE_NAME,
} from "../constants";

/** Get values needed for pagination, such as current page (`page`), current rows per page value (`rowsPerPage`), functions to navigate page.
 * Default value for page is 1, and rowsPerPage's default value is 5.
 * @returns {{page: number, rowsPerPage: number, goToNextPage: () => void, goToPrevPage: () => void}}
 */
export const usePagination = () => {
  const searchParams = useSearchParams();
  const { updateQueryParam } = useQueryParam();

  const pageParam = Number(searchParams.get(CURRENT_PAGE_NAME));
  const rowsPerPageParam = Number(searchParams.get(ROWS_PER_PAGE_NAME));

  const page =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_PAGE;
  const rowsPerPage =
    Number.isInteger(rowsPerPageParam) && rowsPerPageParam > 0
      ? rowsPerPageParam
      : DEFAULT_ROWS_PER_PAGE;

  const goToPrevPage = () => updateQueryParam(CURRENT_PAGE_NAME, page - 1);
  const goToNextPage = () => updateQueryParam(CURRENT_PAGE_NAME, page + 1);

  return { page, rowsPerPage, goToNextPage, goToPrevPage };
};
