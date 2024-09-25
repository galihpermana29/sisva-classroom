"use client";

import { Bell01 } from "@untitled-ui/icons-react";
import { Badge } from "antd";
import Image from "next/image";

import {
  BoxLeft,
  BoxRight,
  BoxTop,
} from "@/app/classroom/shared/presentation/Box/Box";

import ProfileImage from "@/assets/images/Profile.png";
import { useGetAllSubjectsTeached } from "../../usecase/useGetAllSubjectsTeached";
import { useGetUserProfile } from "../../usecase/useGetUserProfile";

const HeaderSection = () => {
  const { data: subjects, isLoading } = useGetAllSubjectsTeached();
  const { data: profile, isLoading: isLoadingProfile } = useGetUserProfile();

  return (
    <div className="relative flex justify-between px-4 py-6 pt-16 -mx-3 -my-7 md:m-0 md:pt-6 bg-gradient-to-br from-primary_hover to-primary rounded-b-3xl md:rounded-xl">
      <BoxLeft />
      <BoxTop
        className="size-[103px] lg:size-[204px] left-1/2 -translate-x-1/3 -top-1/4 lg:-top-full"
        rotate={-67.677}
      />
      <BoxRight />

      <div className="flex flex-col gap-4 md:items-center md:flex-row">
        {isLoadingProfile ? (
          <div className="rounded-full bg-text_description animate-pulse size-14"></div>
        ) : (
          <Image
            src={profile?.profile_image_uri || ProfileImage.src}
            alt={profile?.name || "Profile Image"}
            width={56}
            height={56}
          />
        )}

        <div>
          {isLoading ? (
            <>
              <div className="w-20 h-6 rounded-md bg-text_description animate-pulse" />
              <div className="w-40 h-5 mt-1.5 bg-text_description rounded-md animate-pulse" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white">
                Halo, {profile.name}! 👋
              </h2>
              <p className="text-white text-[15px] line-clamp-1">
                Guru{" "}
                {subjects.map((subject, index) => {
                  return (
                    <span key={index}>
                      {subject}
                      {index < subjects.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center flex-shrink-0 bg-white rounded-full size-12">
        <Badge count={5} overflowCount={9} offset={[-3, 1]} size="small">
          <Bell01 className="text-[rgb(68,68,68)]" size={20} />
        </Badge>
      </div>
    </div>
  );
};

export default HeaderSection;
