"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TINGKAT_FIELD_NAME } from "../../components/filters/TingkatSelect";
import { KELAS_FIELD_NAME } from "../../components/filters/KelasSelect";
import { GURU_FIELD_NAME } from "../../components/filters/GuruSelect";

export const useResetFilterOnProdiChange = (prodi) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (!prodi) return; // prevent this effect from running if prodi is removed because of changes in periode

    params.delete(TINGKAT_FIELD_NAME);
    params.delete(KELAS_FIELD_NAME);
    params.delete(GURU_FIELD_NAME);
    return router.replace(pathname + "?" + params.toString());
  }, [prodi]);
};
