import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { getClientSession } from "../usecase/session/get-client-session";

export default function DowndloadableFileLabel({ url, children }) {
  const [schoolId, setSchoolId] = useState(null);

  useEffect(() => {
    const userData = getClientSession();
    setSchoolId(userData?.school_id);
  }, [url]);

  return (
    <>
      {!schoolId ? (
        <Skeleton.Input active size="small" />
      ) : (
        <a
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/v1/files/${url}?school_id=${schoolId}`}
          download
          target="_blank"
        >
          {children}
        </a>
      )}
    </>
  );
}
