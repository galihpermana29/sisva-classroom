"use client";

import { Bell01 } from "@untitled-ui/icons-react/build/cjs";
import { Badge } from "antd";

import { useGetStudentProfile } from "@/app/classroom/(main)/student/usecase/useGetStudentProfile";
import {
  BoxLeft,
  BoxRight,
  BoxTop,
} from "@/app/classroom/shared/presentation/Box/Box";
import AvatarProfile from "@/app/classroom/shared/presentation/Profile/AvatarProfile";
import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";
import PlaceholderProfile from "@/assets/placeholder.jpg";

const ProfileStudentSection = () => {
  const { tokenColor } = useTokenColor();
  const { student, isLoading } = useGetStudentProfile();
  return (
    <div className="-mx-3 -mt-7 lg:mx-0 lg:mt-0">
      <div
        className="w-full relative  px-6 py-16 lg:py-10 lg:rounded-xl rounded-b-3xl lg:h-fit h-[202px] "
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
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 lg:flex-row">
            {isLoading ? (
              <div className="rounded-full bg-text_description/40 animate-pulse size-14" />
            ) : (
              <AvatarProfile src={student.student_image} size={56} />
            )}

            <div className="flex flex-col gap-1 text-white">
              {isLoading ? (
                <>
                  <div className="w-40 h-6 rounded-md bg-text_description/40 animate-pulse" />
                  <div className="w-20 h-4 rounded-md bg-text_description/40 animate-pulse" />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">
                    Halo, {student.student_name}! 👋
                  </h3>
                  <p className="lg:text-[15px] sm:text-xs">
                    Siswa. {student.student_group_name}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStudentSection;
