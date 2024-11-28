"use client";

import { TableCell, TableRow } from "@mui/material";

import {
  SORT_PARAM_NAME,
  useSortKey,
} from "@/app/administration/[slug]/dashboard/finance/invoice/hooks/useSortKey";
import { useQueryParam } from "@/hooks/useQueryParam";

const CustomTableHeader = ({ columns, sortKeys }) => {
  const keys = useSortKey();
  const { updateQueryParam } = useQueryParam();

  const columnIsSorted = (index) =>
    Boolean(sortKeys) && Array.isArray(sortKeys) && sortKeys[index]
      ? keys.includes(sortKeys[index])
      : false;
  const onSort = (index) => {
    const newSortKey = sortKeys ? sortKeys[index] : undefined;
    if (!newSortKey) return;
    if (keys[0] === newSortKey) {
      updateQueryParam(SORT_PARAM_NAME, null);
      return;
    }
    updateQueryParam(SORT_PARAM_NAME, newSortKey);
  };

  return (
    <TableRow>
      {columns.map((column, index) => (
        <TableCell
          className="hover:cursor-pointer"
          key={`column-${index}-head`}
          sx={{
            fontWeight: 600,
            color: columnIsSorted(index) ? "primary.main" : "inherit",
          }}
          onClick={sortKeys ? () => onSort(index) : undefined}
        >
          {column}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default CustomTableHeader;
