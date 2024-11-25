import { Skeleton } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getClientSession } from "../usecase/session/get-client-session";

const BrandLogo = ({ url }) => {
  const [schoolId, setSchoolId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getClientSession();
    setSchoolId(userData?.school_id);
  }, [url]);

  return (
    <>
      {!schoolId ? (
        <Skeleton.Button active size="large" shape="square" block />
      ) : (
        <Image
          width={200}
          height={200}
          alt="brand-logo"
          className="w-14 h-14 object-cover cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/v1/files/${url}?school_id=${schoolId}`}
          onClick={() => router.push(`/classroom`)}
        />
      )}
    </>
  );
};

export default BrandLogo;
