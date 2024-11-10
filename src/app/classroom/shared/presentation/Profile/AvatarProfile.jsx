import React, { useEffect, useState } from "react";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import { getClientSession } from "../../usecase/session/get-client-session";
import { Avatar } from "antd";
import { UserCircle } from "@untitled-ui/icons-react";

const AvatarProfile = ({ url, size = 60 }) => {
  const [schoolId, setSchoolId] = useState(null);

  useEffect(() => {
    const userData = getClientSession();
    setSchoolId(userData?.school_id);
  }, [url]);

  if (!schoolId) {
    return <SkeletonAvatar size={size} active />;
  }
  return (
    <>
      {!url ? (
        <Avatar size={size} icon={<UserCircle />} />
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
