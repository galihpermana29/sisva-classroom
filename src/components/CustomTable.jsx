import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Suspense } from "react";

export const CustomTable = ({ columns, minWidth, body }) => {
  return (
    <TableContainer>
      <Table
        stickyHeader
        sx={{ minWidth: minWidth ?? 640 }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={`${column}-head`}
                sx={{ fontWeight: 600 }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense
            fallback={<TableBodyLoading columnCount={columns.length} />}
          >
            {body}
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TableBodyLoading = ({ columnCount, rowCount = 10 }) => {
  return Array.from({ length: rowCount }, (_, index) => (
    <TableRow key={`${index}row`}>
      {Array.from({ length: columnCount }, (_, index) => (
        <TableCell key={`${index}cell`}>
          <Skeleton sx={{ height: "1.25rem", width: "100%" }} />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export const TableRowLoading = ({ columnCount }) => {
  return (
    <TableRow>
      {Array.from({ length: columnCount }, (_, index) => (
        <TableCell key={`${index}cell`}>
          <Skeleton sx={{ height: "1.25rem", width: "100%" }} />
        </TableCell>
      ))}
    </TableRow>
  );
};

export const TableEmptyState = ({ columnCount }) => {
  return (
    <TableRow>
      {Array.from({ length: columnCount }, (_, index) => (
        <TableCell key={`${index}cell`}>-</TableCell>
      ))}
    </TableRow>
  );
};
