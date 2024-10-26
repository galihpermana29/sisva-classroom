import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CustomTableHeader = dynamic(() => import("./CustomTableHeader"), {
  ssr: false,
});

/** Component to display a custom table wrapped with table container to handle scrolling/responsiveness
 * @description Provide a `columns` prop to specify the table header, `minWidth` is used to specify a breakpoint for the table to be scrollable horizontally, `body` is used to display the table's body, and `header` is used to customize the default header.
 * @description If not provided, `minWidth` will take a value of 640 px.
 * @param {{columns: JSX.Element[], minWidth: number, body: JSX.Element, sortKeys?: string[]}}
 */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const CustomTable = ({
  columns,
  body,
  sortKeys,
  minWidth = 640,
  id,
}) => {
  return (
    <TableContainer>
      <Table stickyHeader sx={{ minWidth }} id={id ?? getRandomInt(0, 100)}>
        <TableHead>
          <Suspense fallback={<TableRowLoading columnCount={columns.length} />}>
            <CustomTableHeader sortKeys={sortKeys} columns={columns} />
          </Suspense>
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

/** Used to display a placeholder when the whole table body is still loading
 * @description `columnCount` should be given the same value as the data's number of column. Customize the value of `rowCount` to display a number of loading rows.
 * @param {{columnCount: number, rowCount: number}}
 */
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

/** Used to display a placeholder when a single table row is still loading
 * @description `columnCount` should be given the same value as the data's number of column. Customize the value of `rowCount` to display a number of loading rows.
 * @param {{columnCount: number}}
 */
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

/** Used to display a placeholder for a single cell */
export const TableCellLoading = () => {
  return (
    <TableCell>
      <Skeleton sx={{ height: "1.25rem", width: "100%" }} />
    </TableCell>
  );
};

/** Used to display a single empty row, usually used to display an empty state if there's no data given to a table.
 * @description `columnCount` should be given the same value as the data's number of column. Customize the value of `rowCount` to display a number of loading rows.
 * @param {{columnCount: number}}
 */
export const TableEmptyState = ({ columnCount }) => {
  return (
    <TableRow>
      {Array.from({ length: columnCount }, (_, index) => (
        <TableCell key={`${index}cell`}>-</TableCell>
      ))}
    </TableRow>
  );
};
