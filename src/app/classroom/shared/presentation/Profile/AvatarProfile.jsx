import { Avatar } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";

import React, { useEffect, useState } from "react";
import { getClientSession } from "../../usecase/session/get-client-session";

const AvatarProfile = ({ url, size = 60 }) => {
  const [schoolId, setSchoolId] = useState(null);

  useEffect(() => {
    const userData = getClientSession();
    setSchoolId(userData?.school_id);
  }, [url]);

  return (
    <>
      {!schoolId ? (
        <SkeletonAvatar size={size} active />
      ) : (
        <Avatar
          size={size}
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/file/v1/files/${url}?school_id=${schoolId}`}
        />
      )}
    </>
  );
};

export default AvatarProfile;
