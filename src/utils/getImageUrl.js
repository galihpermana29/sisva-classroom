"use client";

import { getSchoolId } from "@/api";
import { createQueryParam } from "./createQueryParam";

export const getImageUrl = (image) => {
  if (!image) return "";
  const schoolId = getSchoolId();
  const param = createQueryParam({ name: "school_id", value: schoolId });
  return `https://api-staging.sisva.id/file/v1/files/${image}?${param}`;
};
