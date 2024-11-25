"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { CURRENT_PAGE_NAME } from "@/app/administration/[slug]/dashboard/finance/invoice/constants";

/** Hooks to create a new filter string, or update current filter string, followed by resetting current page to `page = 1`
 * @description This hook is an extension to `useQueryParam`. Setting a `null` value to `value` param would delete the provided param with a name `name`.
 * @returns {{createFilterString: (name: string, value: string | null) => string, updateFilters: (name: string, value: string | null) => void}}
 */
export const useInvoiceFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createFilterString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);
      params.delete(CURRENT_PAGE_NAME);

      return params.toString();
    },
    [searchParams]
  );

  /** Update `name` filter param with the new value, while also resetting page param to its default value (`DEFAULT_PAGE` or 1)
   * @param {string} name - Filter param name
   * @param {string | null} value - New value of filter param
   * @returns {void} Replace the current string param with the new value
   */
  const updateFilters = (name, value) =>
    router.replace(pathname + "?" + createFilterString(name, value));

  return { createFilterString, updateFilters };
};
