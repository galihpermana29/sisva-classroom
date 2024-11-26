import { parseAsInteger, useQueryState } from "nuqs";

import { paginateData } from "@/utils/paginateData";

import useFilteredInvoices from "./useFilteredInvoices";

export default function usePaginatedFilteredInvoices() {
  const filteredInvoices = useFilteredInvoices();
  const [rowsPerPage] = useQueryState("rows", parseAsInteger.withDefault(5));

  const paginatedInvoices = paginateData(filteredInvoices, rowsPerPage);
  const totalPage =
    paginatedInvoices.length === 0 ? 1 : paginatedInvoices.length;

  return { paginatedInvoices, totalPage };
}
