"use client";

import { Bell01 } from "@untitled-ui/icons-react";
import { Badge } from "antd";

import {
  BoxLeft,
  BoxRight,
  BoxTop,
} from "@/app/classroom/shared/presentation/Box/Box";

import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";
import { useGetAllSubjectsTeached } from "../../usecase/useGetAllSubjectsTeached";
import { useGetUserProfile } from "../../usecase/useGetUserProfile";

const HeaderSection = () => {
  const { data: subjects, isLoading } = useGetAllSubjectsTeached();
  const { data: profile, isLoading: isLoadingProfile } = useGetUserProfile();
  const { tokenColor } = useTokenColor();

  return (
    <div
      className="relative flex items-center justify-between px-4 py-6 pt-16 -mx-3 -my-7 md:m-0 md:pt-6 rounded-b-3xl md:rounded-xl"
      style={{
        backgroundColor: tokenColor,
      }}
    >
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
          <AvatarProfile url={profile?.profile_image_uri} />
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
                Halo, {profile?.name}! 👋
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
    </div>
  );
};

export default HeaderSection;
