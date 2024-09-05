"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const updateQueryParam = (name, value) =>
    router.push(pathname + "?" + createQueryString(name, value));

  return { updateQueryParam, createQueryString };
};
