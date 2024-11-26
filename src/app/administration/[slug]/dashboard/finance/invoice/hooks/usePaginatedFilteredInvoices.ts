import { parseAsInteger, useQueryState } from "nuqs";

import { segmentArray } from "@/utils/segmentArray";

import { InvoiceQueryKey } from "../utils/types";
import useFilteredInvoices from "./useFilteredInvoices";

export default function usePaginatedFilteredInvoices() {
  const { filteredInvoices, isFetching } = useFilteredInvoices();
  const [rowsPerPage] = useQueryState(
    InvoiceQueryKey.sort,
    parseAsInteger.withDefault(5)
  );

  const paginatedInvoices = segmentArray(filteredInvoices, rowsPerPage);
  const totalPage =
    paginatedInvoices.length === 0 ? 1 : paginatedInvoices.length;

  return { paginatedInvoices, totalPage, isFetching };
}
