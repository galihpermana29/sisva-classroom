"use client";

import {
  SORT_PARAM_NAME,
  useSortKey,
} from "@/app/administration/[slug]/dashboard/finance/invoice/hooks/useSortKey";
import { useQueryParam } from "@/hooks/useQueryParam";
import { TableCell, TableRow, useTheme } from "@mui/material";

const CustomTableHeader = ({ columns, sortKeys }) => {
  const theme = useTheme();
  const keys = useSortKey();
  const { updateQueryParam } = useQueryParam();

  const columnIsSorted = (index) =>
    sortKeys !== undefined ? keys.includes(sortKeys[index]) : false;
  const onSort = (index) => {
    const set = new Set([...keys]);
    const newSortKey = sortKeys ? sortKeys[index] : undefined;
    if (!newSortKey) return;

    set.has(newSortKey) ? set.delete(newSortKey) : set.add(newSortKey);
    const newSortKeysArray = Array.from(set);

    updateQueryParam(SORT_PARAM_NAME, newSortKeysArray.join(","));
  };

  return (
    <TableRow>
      {columns.map((column, index) => (
        <TableCell
          className="hover:cursor-pointer"
          key={`column-${index}-head`}
          sx={{
            fontWeight: 600,
            color: columnIsSorted(index)
              ? theme.palette.primary.main
              : "inherit",
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
