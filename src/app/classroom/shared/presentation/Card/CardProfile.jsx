import React from "react";
import { BoxLeft, BoxRight, BoxTop } from "../Box/Box";
import Image from "next/image";
import { Avatar, Divider } from "antd";
import DummyProfile from "@/assets/classroom/images/DummyProfile.png";
import { UserCircle } from "@untitled-ui/icons-react";
import AvatarProfile from "../Profile/AvatarProfile";
import { useTokenColor } from "../../usecase/use-token-color";

const CardProfile = ({
  name,
  username,
  subject,
  identityNumber,
  profilePic,
}) => {
  const { tokenColor } = useTokenColor();
  return (
    <div
      className="text-white relative flex flex-col gap-3 p-5 rounded-b-3xl md:rounded-xl"
      style={{
        background: `linear-gradient(to bottom right, ${tokenColor}, ${tokenColor})`,
      }}
    >
      <BoxLeft />
      <BoxTop
        className="size-[103px] lg:size-[204px] left-1/2 -translate-x-1/3 -top-1/4 lg:-top-full"
        rotate={-67.677}
      />
      <BoxRight />
      <div className="flex items-center flex-col gap-2">
        <h2 className="text-lg font-semibold mb-4">Profilku</h2>
        {profilePic === "" ? (
          <Avatar size={60} icon={<UserCircle />} />
        ) : (
          <AvatarProfile url={profilePic} />
        )}
        <div className="text-center">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm">@{username}</p>
        </div>
      </div>
      {/* <div className="flex justify-between text-sm">
        <div>
          <p className="font-semibold">Mata Pelajaran</p>
          <p>{subject}</p>
        </div>
        <div className="h-full w-[1px] bg-white" />
        <div>
          <p className="font-semibold">NIK</p>
          <p>{identityNumber}</p>
        </div>
      </div> */}
    </div>
  );
};

export default CardProfile;
