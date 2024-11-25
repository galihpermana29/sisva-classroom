"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import CmsAPI from "@/api/cms";
import { Spinner } from "@/assets/svgs/Spinner";

import SchoolIdProvider from "./SchoolContext";

export default function Layout({ children }) {
  const { slug } = useParams();
  const { data: schoolData, isLoading } = useQuery({
    queryKey: ["school-id", slug],
    queryFn: async () => (await CmsAPI.getSchoolByCode(slug)).data.data,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (schoolData.logo_uri) {
    schoolData.logo_url = `https://api-staging.sisva.id/file/v1/files/${schoolData.logo_uri}?school_id=${schoolData.id}`;
  } else {
    schoolData.logo_url = null;
  }
  if (schoolData.landing_image_uri) {
    schoolData.landing_image_url = `https://api-staging.sisva.id/file/v1/files/${schoolData.landing_image_uri}?school_id=${schoolData.id}`;
  } else {
    schoolData.landing_image_url = null;
  }

  return (
    <SchoolIdProvider schoolData={schoolData}>{children}</SchoolIdProvider>
  );
}
