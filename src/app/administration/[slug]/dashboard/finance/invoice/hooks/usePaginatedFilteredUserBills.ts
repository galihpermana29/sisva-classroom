import { parseAsInteger, useQueryState } from "nuqs";

import { segmentArray } from "@/utils/segmentArray";

import { InvoiceQueryKey } from "../utils/types";
import useFilteredUserBills from "./useFilteredUserBills";

export default function usePaginatedFilteredUserBills() {
  const { filteredUserBills, isFetching } = useFilteredUserBills();
  const [rowsPerPage] = useQueryState(
    InvoiceQueryKey.rows,
    parseAsInteger.withDefault(5)
  );

  const paginatedUserBills = segmentArray(filteredUserBills, rowsPerPage);
  const totalPage =
    paginatedUserBills.length === 0 ? 1 : paginatedUserBills.length;

  return { paginatedUserBills, totalPage, isFetching };
}
