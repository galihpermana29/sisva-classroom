"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetDefaultPeriod } from "./useGetDefaultPeriod";
import { PERIODE_FIELD_NAME } from "../../components/filters/PeriodeSelect";

export const useSetDefaultPeriod = (periode) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const defaultPeriod = useGetDefaultPeriod();

  useEffect(() => {
    if (!periode) {
      // set to default period value
      params.set(PERIODE_FIELD_NAME, defaultPeriod);
      return router.replace(pathname + "?" + params.toString());
    }
  }, [defaultPeriod]);
};
